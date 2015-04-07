(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Topnav', Topnav);

    Topnav.$inject = ['$rootScope', '$route', 'routehelper', 'menuhelper'];

    function Topnav($rootScope, $route, routehelper, menuhelper) {
        /*jshint validthis: true */
        var vm = this;
        var routes = routehelper.getRoutes();
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
            $rootScope.$on('$routeChangeSuccess',
                function(event, current, previous) {

                    angular.forEach(menus, function (m) {
                        if (m.component == current.title)
                            this.menus = m.menus;
                    }, vm);
                }
            );
        }

        function getNavRoutes() {
            vm.navRoutes = routes.filter(function(r) {
                return r.settings && r.settings.nav;
            }).sort(function(r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }

        /**
         * generate top nav menu for current route
         *
         * @return {[type]} [description]
         */
        function getMenus() {

            var curComponent = $route.current.title;

            angular.forEach(menus, function (m) {
                if (m.component == curComponent)
                    this.menus = m.menus;
            }, vm);
        }        

        function isCurrent(route) {
            if (!route.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }
    }
})();
