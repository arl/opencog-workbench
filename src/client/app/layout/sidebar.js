(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Sidebar', Sidebar);

    Sidebar.$inject = ['$state', 'routehelper'];

    function Sidebar($route, routehelper) {
        /*jshint validthis: true */
        var vm = this;
        var routes = routehelper.getNavRoutes();
        vm.isCurrent = isCurrent;
        vm.sidebarReady = function() {console.log('done animating menu'); }; // example

        activate();

        function activate() {  }

    }
})();
