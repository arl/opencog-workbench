(function() {
    'use strict';

    angular
        .module('blocks.router')
        .provider('stateHelperConfig', stateHelperConfig)
        .factory('stateHelper', stateHelper);

    // Must configure via the stateHelperConfigProvider
    function stateHelperConfig() {
        /* jshint validthis:true */
        this.config = {
            // These are the properties we need to set
            // $routeProvider: undefined
            // docTitle: ''
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function() {
            return {
                config: this.config
            };
        };
    }

    // stateHelper.$inject = ['$location', '$rootScope', '$state', 'logger', 'stateHelperConfig'];

    /* @ngInject */
    function stateHelper($location, $rootScope, $state, logger, stateHelperConfig) {
        var handlingRouteChangeError = false;
        var stateCounts = {
            errors: 0,
            changes: 0
        };
        var mainNavStates = [];
        var stateChangesListeners = [];
        var $stateProvider = stateHelperConfig.config.$stateProvider;
        var $urlRouterProvider = stateHelperConfig.config.$urlRouterProvider;
        var $stickyStateProvider = stateHelperConfig.config.$stickyStateProvider; 

        var service = {
            configureStates: configureStates,
            getMainNavStates: getMainNavStates,
            notifyStateChanges: notifyStateChanges, 
            stateCounts: stateCounts
        };

        init();

        return service;
        ///////////////

        /**
         * [getMainNavStates return the 'main navigation' states, i.e the workbench module states]
         *
         * @return {[type]} [description]
         */
        function getMainNavStates() {

            console.log('CHANGE THIS FUNCTION, IT SHOULD TAKE THE FIRST DECLARED STATES OF EACH DECLARED MODULE');

            if (mainNavStates.length === 0) {
                var states = $state.get();
                for (var prop in states) {
                    if (states.hasOwnProperty(prop)) {
                        var state = states[prop];
                        var isNavRoute = !!state.title;
                        if (isNavRoute) {
                            mainNavStates.push(state);
                        }
                    }
                }
            }
            return mainNavStates;
        }

        function notifyStateChanges(callback) {
            stateChangesListeners.push(callback);
        }

        function configureStates(routes) {
            routes.forEach(function(route) {
                route.config.resolve =
                    angular.extend(route.config.resolve || {}, stateHelperConfig.config.resolveAlways);
                $stateProvider.state(route.state, route.config);
            });
            $urlRouterProvider.otherwise('/');
        }

        function handleStateErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$stateChangeError',
                function(event, toState, toParams, fromState, fromParams, error) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    stateCounts.errors++;
                    handlingRouteChangeError = true;
                    var destination = (toState && (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (error.msg || '');
                    logger.warning(msg, [toState]);
                    $location.path('/');
                }
            );
            // on state not found, go to dashboard
            $rootScope.$on('$stateNotFound',
                function(event, unfoundState, fromState, fromParams) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    stateCounts.errors++;
                    handlingRouteChangeError = true;
                    var destination = (unfoundState && (unfoundState.title || unfoundState.to || unfoundState.name)) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + ': state not found';
                    logger.warning(msg, [unfoundState]);
                    $location.path('/');
                }
            );
        }

        function handleStateChanges() {
            $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams) {

                    // update state change count
                    stateCounts.changes++;
                    handlingRouteChangeError = false;

                    setDocTitle(stateHelperConfig.config.docTitle + ' ' + (toState.title || ''));

                    // notify the registered state change callbacks
                    angular.forEach(stateChangesListeners, function (listener) {
                        listener(toState, toParams, fromState, fromParams);
                    });
                }
            );
        }

        function setDocTitle(title) {
            $rootScope.title = title; // data bind to <title>
        }

        function init() {
            handleStateErrors();
            handleStateChanges();
        }
    }
})();
