(function() {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routeHelperConfig', routeHelperConfig)
        .factory('routeHelper', routeHelper);

    // Must configure via the routeHelperConfigProvider
    function routeHelperConfig() {
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

    /* @ngInject */
    function routeHelper($location, $rootScope, $state, $stickyState, logger, routeHelperConfig) {
        var handlingRouteChangeError = false;
        var stateCounts = {
            errors: 0,
            changes: 0
        };
        var mainRoutes = [];
        var $stateProvider = routeHelperConfig.config.$stateProvider;
        var $urlRouterProvider = routeHelperConfig.config.$urlRouterProvider;
        var $stickyStateProvider = routeHelperConfig.config.$stickyStateProvider; 

        var service = {
            configureRoutes: configureRoutes,
            getMainRoutes: getMainRoutes,
            stateCounts: stateCounts,
            resetState: resetState
        };

        init();

        return service;
        ///////////////

        /**
         * reset/clear state
         * @param  {String} stateName name of state to reset
         */
        function resetState(stateName) {
            $stickyState.reset(stateName);
        }

        /**
         * return the 'main navigation' routes, that are also the main app states,
         *     i.e the workbench components states
         * @return {Array} [description]
         */
        function getMainRoutes() {

            console.log('CHANGE THIS FUNCTION, IT SHOULD TAKE THE FIRST DECLARED STATES OF EACH DECLARED MODULE');

            if (mainRoutes.length === 0) {
                var states = $state.get();
                for (var prop in states) {
                    if (states.hasOwnProperty(prop)) {
                        var state = states[prop];
                        var isNavRoute = !!state.title;
                        if (isNavRoute) {
                            mainRoutes.push(state);
                        }
                    }
                }
            }
            return mainRoutes;
        }

        /**
         * configure routes for a workbench component
         *
         * each component should register its routes by calling routehelper.configureRoutes
         * a good moment to do so is to do it in the component's module run function
         * @param  {Array} routes component routes to configure
         */
        function configureRoutes(routes) {
            routes.forEach(function(route) {
                route.config.resolve =
                    angular.extend(route.config.resolve || {}, routeHelperConfig.config.resolveAlways);
                $stateProvider.state(route.state, route.config);
            });
            $urlRouterProvider.otherwise('/');
        }

        ///////////////        

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
                    setDocTitle(routeHelperConfig.config.docTitle + ' ' + (toState.title || ''));
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
