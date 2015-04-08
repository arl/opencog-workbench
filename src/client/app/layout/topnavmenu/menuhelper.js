(function() {
    'use strict';

    angular
        .module('app.layout.topnavmenu')
        .factory('menuhelper', menuhelper);

    menuhelper.$inject = ['$location', '$rootScope', '$state', 'logger'];

    function menuhelper($location, $rootScope, $state, logger) {
        // var handlingRouteChangeError = false;
        // var routeCounts = {
        //     errors: 0,
        //     
        //     changes: 0
        //     
        // };
        var _menus = [];
        // var $routeProvider = stateHelperConfig.config.$routeProvider;

        var service = {
            configureMenus: configureMenus,
            getMenus: getMenus/*,
            //menuCounts: menuCounts
            //*/
        };

        //init();

        return service;
        ///////////////

        /**
         * [configureMenus add menu]
         *
         * @param  {String} component component which menu is being configured
         *                            (should be the same as title of the title element set in config.route.js
         *                            TODO : maybe create a module constant that could be used for this
         * @param  {Array} menus      menu description
         *
         * @return {[type]}           [description]
         */
        function configureMenus(component, menus) {
            _menus.push({'component':component, 'menus': menus});
        }
/*
        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$routeChangeError',
                function(event, current, previous, rejection) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    routeCounts.errors++;
                    handlingRouteChangeError = true;
                    var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                    logger.warning(msg, [current]);
                    $location.path('/');
                }
            );
        }

        function init() {
            handleRoutingErrors();
            updateDocTitle();
        }
*/
        /**
         * [getMenus get all configured menus]
         *
         * @return {[type]} [description]
         */
        function getMenus() {
            // for (var prop in $route.routes) {
            //     if ($route.routes.hasOwnProperty(prop)) {
            //         var route = $route.routes[prop];
            //         var isRoute = !!route.title;
            //         if (isRoute) {
            //             routes.push(route);
            //         }
            //     }
            // }
            return _menus;
        }

        // function updateDocTitle() {
        //     $rootScope.$on('$routeChangeSuccess',
        //         function(event, current, previous) {
        //             routeCounts.changes++;
        //             handlingRouteChangeError = false;
        //             var title = stateHelperConfig.config.docTitle + ' ' + (current.title || '');
        //             $rootScope.title = title; // data bind to <title>
        //         }
        //     );
        // }
    }
})();
