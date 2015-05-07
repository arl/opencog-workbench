(function() {
    'use strict';

    angular
        .module('blocks.menu')
        .factory('menuhelper', menuhelper);

    /* @ngInject */
    function menuhelper(_) {

        var allMenus = [];

        var service = {
            configureMenus: configureMenus,
            getAllMenus: getAllMenus,
            setMenuHandler: setMenuHandler,
            resetMenuHandler: resetMenuHandler
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
        function setMenuHandler(menupath, handler) {
            var menuitem = getMenuItem(menupath);
            if (menuitem) {
                if (menuitem.handler) {
                    throw {message: 'click handler already exists for menu item ' + menupath};
                } else {
                    // set handler
                    menuitem.handler = handler;
                }
            } else {
                throw {message: 'couldn\'t find menu item ' + menupath};
            }
        }

        /**
         * reset a click handler
         * @param {String} menupath     menu item path,
         */
        function resetMenuHandler(menupath) {

            // treat 'globbed' menu item paths
            if (menupath.indexOf('*') > -1) {
                var menuitems = getMenuItems(menupath);
                if (menuitems) {
                    _.each(menuitems, function(it) { 
                        if (it.handler) {
                            delete it.handler;
                        };                    
                    });
                } else {
                    throw {message: 'couldn\'t get menu items from globbed path ' + menupath};
                }
            } else {
                var menuitem = getMenuItem(menupath);
                if (menuitem) {
                    if (menuitem.handler) {
                        delete menuitem.handler;                        
                    }
                } else {
                    throw {message: 'couldn\'t find menu item ' + menupath};
                }
            }
        }

        ///////////////
        // private
        
        /**
         * retrieve a menu item (or null) from its menupath)
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
            catch (e) {}
            return menuitem;
        }

        /**
         * retrieve a list of menu items (or null) from a globbed menupath (using *)
         * @note '*' can only be used at the end of string
         * @param  {String} menupath globbed menu item path,
         *                           in the form :
         *                               '/componentid/menuid/*' or
         *                               '/componentid/*'
         */
        function getMenuItems(menupath) {
            var menuitem = null;
            var path = menupath.split('/');
            path.shift();
            var items = [];

            // find menu item
            try {
                var component = _.find(allMenus, function(m) { return m.component === path[0]; });
                _.each(component.menus, function(menu) {
                    if (path[1] === '*') {
                        _.each(menu.items, function(item) {
                            items.push(item);
                        });       
                    } else if (path[2] === '*') {
                        if (menu.id == path[1]) {
                            _.each(menu.items, function(item) { items.push(item); });                            
                        }
                    }
                });
            }
            catch (e) {}
            return items;
        }

    }
})();
