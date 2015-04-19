(function() {
    'use strict';

    angular
        .module('app.layout.tabs')
        .controller('Tabs', Tabs);

    /* @ngInject */
    function Tabs($scope, config, logger, $state, TabMgr) {
        /*jshint validthis: true */
        var vm = this;

        // should return if we show this tab or not (maybe we can directly do it
        // in the expression ng-show in template?)
        vm.showTab = function(tab) {
            var shouldShowTab = $state.includes(tab);
            return shouldShowTab;
        };

        // get all tabs
        vm.getTabs = function(tab) {
            return TabMgr.getTabs();
        };

        // close tab
        vm.closeTab = function($event, tab) {
            $event.stopPropagation();
            TabMgr.closeTab(tab);
        };

        activate();

        function activate() {

            // // redirect to dashboard if trying to load root url
            // if ($state.current.name === 'tab') {
            //     $state.go('.dashboard');
            // }

            // monitor state changes to update tabs
            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                if (!!$state.current.sticky) {
                    TabMgr.openTab($state.current);
                }
            });
        }
    }
})();
