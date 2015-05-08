(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Topnav', Topnav);

    /* @ngInject */
    function Topnav($rootScope, $state, routeHelper, menuhelper, TabMgr, _) {
        /*jshint validthis: true */
        var vm = this;

        var mainRoutes = routeHelper.getMainRoutes();
        var allMenus = menuhelper.getAllMenus();

        vm.isCurrent = isCurrent;
        vm.getTabs = getTabs;
        vm.closeTab = closeTab;

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
         * say if we currently are on given main route (or in a substate of it)
         * @param  {String}  route main route name
         */
        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }
            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }

        /**
         * get all tabs
         */
        function getTabs() {            
            return TabMgr.getTabs();
        }

        function closeTab($event, tab) {
            $event.stopPropagation();
            if (tab.closeEnabled) {
                TabMgr.closeTab(tab);
            }
        }

        /**
         * get main navigation routes (i.e workbench components main route)
         * @return {Array}
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
    }
})();
