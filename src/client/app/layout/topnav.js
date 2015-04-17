(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Topnav', Topnav);

    Topnav.$inject = ['$rootScope', '$state', 'routeHelper', 'menuhelper', '_'];

    function Topnav($rootScope, $state, routeHelper, menuhelper, _) {
        /*jshint validthis: true */
        var vm = this;
        var mainRoutes = routeHelper.getMainRoutes();
        var allMenus = menuhelper.getMenus();
        vm.isCurrent = isCurrent;
        console.log(vm.title); // example
        //vm.sidebarReady = function(){console.log('done animating menu')}; // example

        activate();

        function activate() {
            getMainRoutes();
            getMenus($state.current.name);
            updateMenu();
        }

        /**
         * [updateMenu listen for route changes to update TopNav menu]
         *
         * @return {[type]} [description]
         */
        function updateMenu() {
            $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams) {
                    getMenus(toState.title);
                }
            );
        }

        /**
         * get main navigation routes (i.e different oc-workbench modules and their main routes)
         *
         * @return {[type]} [description]
         */
        function getMainRoutes() {
            vm.mainRoutes = mainRoutes.filter(function(r) {
                return r.data && r.data.nav;
            }).sort(function(r1, r2) {
                return r1.data.nav - r2.data.nav;
            });
        }       

        /**
         * [get current composent menu items to be displayed]
         *
         * @param  {[type]} currentComponent [currently active component]
         *
         * @return {[Array]}                 [menu elements to be displayed when component is active]
         */
        function getMenus(currentComponent) {

            // find menu defined for currently active component
            var componentMenu = _.find(allMenus, function(m) { return m.component === currentComponent; });
            if (componentMenu) {
                // trigger the UI actual menu update
                vm.menus = componentMenu.menus;
            }
        }        

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }
            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }
    }
})();
