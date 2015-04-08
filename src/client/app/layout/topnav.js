(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Topnav', Topnav);

    Topnav.$inject = ['$rootScope', '$state', 'routehelper', 'menuhelper'];

    function Topnav($rootScope, $state, routehelper, menuhelper) {
        /*jshint validthis: true */
        var vm = this;
        var navRoutes = routehelper.getNavRoutes();
        var menus = menuhelper.getMenus();
        vm.isCurrent = isCurrent;
        console.log(vm.title); // example
        //vm.sidebarReady = function(){console.log('done animating menu')}; // example

        activate();

        function activate() {
            getNavRoutes();
            updateMenu();
//            getMenus();
        }


        /**
         * [updateMenu listen for route changes to update TopNav menu]
         *
         * @return {[type]} [description]
         */
        function updateMenu() {
            $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams) {

                    angular.forEach(menus, function (m) {
                        if (m.component == toState.name)
                            this.menus = m.menus;
                    }, vm);
                }
            );
        }

        function getNavRoutes() {
            vm.navRoutes = navRoutes.filter(function(r) {
                return r.data && r.data.nav;
            }).sort(function(r1, r2) {
                return r1.data.nav - r2.data.nav;
            });
        }

        /**
         * generate top nav menu for current route
         *
         * @return {[type]} [description]
         */
        function getMenus() {

            var curComponent = $state.current.title;

            angular.forEach(menus, function (m) {
                if (m.component == curComponent)
                    this.menus = m.menus;
            }, vm);
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
