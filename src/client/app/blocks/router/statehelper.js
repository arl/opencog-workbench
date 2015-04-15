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
        var $stateProvider = stateHelperConfig.config.$stateProvider;
        var $urlRouterProvider = stateHelperConfig.config.$urlRouterProvider;

        var service = {
            configureStates: configureStates,
            getMainNavStates: getMainNavStates,
            stateCounts: stateCounts
        };

        init();

        return service;
        ///////////////

        function configureStates(routes) {
            routes.forEach(function(route) {
                route.config.resolve =
                    angular.extend(route.config.resolve || {}, stateHelperConfig.config.resolveAlways);
                $stateProvider.state(route.state, route.config);
            });
            $urlRouterProvider.otherwise('/');
        }

        function handleRoutingErrors() {
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

        function init() {
            handleRoutingErrors();
            updateDocTitle();
        }

        /**
         * [getMainNavStates description]
         *
         * @return {[type]} [description]
         */
        function getMainNavStates() {

console.log('CHANGE THIS FUNCTION, IT SHOULD TAKE THE FIRST DECLARED STATES OF EACH DECLARED MODULE')

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
            return mainNavStates;
        }

        function updateDocTitle() {
            $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams) {
                    stateCounts.changes++;
                    handlingRouteChangeError = false;
                    var title = stateHelperConfig.config.docTitle + ' ' + (toState.title || '');
                    $rootScope.title = title; // data bind to <title>
                }
            );
        }
    }
})();

/*
myApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "partials/state1.html"
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
});
*/
