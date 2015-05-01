(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Topnav', Topnav);

    /* @ngInject */
    function Topnav($rootScope, $state, routeHelper, menuhelper, _) {
        /*jshint validthis: true */
        var vm = this;
        var mainRoutes = routeHelper.getMainRoutes();
        var allMenus = menuhelper.getAllMenus();
        vm.isCurrent = isCurrent;
        console.log(vm.title); // example
        //vm.sidebarReady = function(){console.log('done animating menu')}; // example

        activate();

        function activate() {
            getMainRoutes();
            updateMenu($state.current.url);
            
            // update top nav menu on state changes 
            $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams) {
                    updateMenu(toState.url);
                }
            );
        }

        /**
         * get main navigation routes (i.e workbench components main route)
         * @return {Array} list of components main route
         */
        function getMainRoutes() {
            vm.mainRoutes = mainRoutes.filter(function(r) {
                return r.data && r.data.nav;
            }).sort(function(r1, r2) {
                return r1.data.nav - r2.data.nav;
            });
        }       

        /**
         * get current composent menu items to be displayed
         * @note touch bound variable 'menus'
         * @param  {String} componentid     id of currently active component
         */
        function updateMenu(componentid) {

            // find menu defined for currently active component
            var componentMenu = _.find(allMenus, function(m) { return m.component === componentid; });
            if (componentMenu) {
                // trigger the UI menu update
                vm.menus = componentMenu.menus;
            }
        }        

        /**
         * say if we currently are on given main route (or in a substate of it)
         * @param  {String}  route main route name
         * @return {Boolean} are we on given route
         */
        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }
            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }
    }
})();
