(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Sidebar', Sidebar);

    Sidebar.$inject = ['$state', 'stateHelper'];

    function Sidebar($route, stateHelper) {
        /*jshint validthis: true */
        var vm = this;
        var routes = stateHelper.getMainNavStates();
        //vm.isCurrent = isCurrent;
        vm.sidebarReady = function() {console.log('done animating menu'); }; // example

        activate();

        function activate() {  }

    }
})();
