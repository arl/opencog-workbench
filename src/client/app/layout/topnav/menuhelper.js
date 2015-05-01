(function() {
    'use strict';

    angular
        .module('app.layout.topnav')
        .factory('menuhelper', menuhelper);

    /* @ngInject */
    function menuhelper() {

        var allMenus = [];

        var service = {
            configureMenus: configureMenus,
            getAllMenus: getAllMenus,
            setClickHandler: setClickHandler,
            resetClickHandler: resetClickHandler
        };

        return service;
        ///////////////

        /**
         * configure Menus for a workbench component
         * @param  {String} component component which menu is being configured
         *                            (should be the same as title of the title element set in config.route.js
         * @param  {Array} menus      menu description
         */
        function configureMenus(component, menus) {
            allMenus.push({'component':component, 'menus': menus});
        }

        /**
         * get menus for all components
         * @return {Array} array of menus by component
         */
        function getAllMenus() {
            return allMenus;
        }

        /**
         * define click handler for a component menu
         * @param {String} menupath     menu item path,
         *                              in the form (ex: /componentid/menuid/menuitemid)
         * @param {Function} handler    function that will be called whe user click
         *                              on corresponding menu item
         */
        function setClickHandler(menupath, handler) {
            var menuitem = getMenuItem(menupath);
            if (menuitem) {
                if (menuitem.handler) {
                    throw { message: 'click handler already exists for menu item ' + menupath};
                } else {
                  // set handler
                  menuitem.handler = handler;
                }
            } else {
                throw { message: 'couldn\'t find menu item ' + menupath};
            }
        }

        /**
         * reset a click handler
         * @param {String} menupath     menu item path,
         */
        function resetClickHandler(menupath) {
            var menuitem = getMenuItem(menupath);
            if (menuitem && menuitem.handler) {
                delete menuitem.handler;
            } else {
                throw { message: 'couldn\'t find menu item ' + menupath};
            }          
        }

        ///////////////
        // private
        
        /**
         * retrieve a menu item (or null from its menupath)
         * @param  {String} menupath menu item path,
         *                           in the form (ex: /componentid/menuid/menuitemid)
         * @return {Object}          menu item
         */
        function getMenuItem(menupath) {
            var menuitem = null;
            var path = menupath.split('/');
            path.shift();

            // find menu item
            try {
                var component = _.find(allMenus, function(m) { return m.component === path[0]; });
                var menu = _.find(component.menus, function(menu) { return menu.id === path[1]; });
                menuitem = _.find(menu.items, function(item) { return item.id === path[2]; });
            }
            catch(e) {}
            return menuitem;
        }
    }
})();
