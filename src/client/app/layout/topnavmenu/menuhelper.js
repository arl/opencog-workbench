(function() {
    'use strict';

    angular
        .module('app.layout.topnavmenu')
        .factory('menuhelper', menuhelper);

    /* @ngInject */
    function menuhelper() {
        var _menus = [];
        var service = {
            configureMenus: configureMenus,
            getAllMenus: getAllMenus,
            
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
         * [getAllMenus get all configured menus]
         *
         * @return {[type]} [description]
         */
        function getAllMenus() {
            return _menus;
        }
    }
})();
