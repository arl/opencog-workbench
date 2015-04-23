(function() {
    'use strict';

    angular
        .module('app.layout.topnavmenu')
        .factory('menuhelper', menuhelper);

    menuhelper.$inject = ['$location', '$rootScope', '$state', 'logger'];

    function menuhelper($location, $rootScope, $state, logger) {
        var _menus = [];
        var service = {
            configureMenus: configureMenus,
            getMenus: getMenus
        };

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
    }
})();
