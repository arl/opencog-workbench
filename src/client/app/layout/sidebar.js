(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Sidebar', Sidebar);

    Sidebar.$inject = ['$state', 'routeHelper'];

    function Sidebar($route, routeHelper) {
        /*jshint validthis: true */
        var vm = this;
        var routes = routeHelper.getMainRoutes();
        //vm.isCurrent = isCurrent;
        vm.sidebarReady = function() {console.log('done animating menu'); }; // example

        activate();

        function activate() {  }

    }
})();
