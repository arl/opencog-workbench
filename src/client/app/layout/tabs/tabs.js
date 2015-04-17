(function() {
    'use strict';

    angular
        .module('app.layout.tabs')
        .controller('Tabs', Tabs);

    /* @ngInject */
    function Tabs($scope, config, logger, $state, TabMgr) {
        /*jshint validthis: true */
        var vm = this;

        if ($state.current.name === 'tab') {
            $state.go('.dashboard');
        }

        $scope.$on('$stateChangeSuccess', function(toState) {
        
            if ($state.current.name === 'tab') {
                $state.go('.dashboard');
            }
        });

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

        // activate();

        // function activate() {
        //     logger.success(config.appTitle + ' loaded!', null);
        //     // Using a resolver on all routes or dataservice.ready in every controller
        //     // dataservice.ready().then(function(){
        //     //     hideSplash();
        //     // });
        //     hideSplash();
        //     getTabs();
        // }

        // function hideSplash() {
        //     //Force a 1 second delay so we can see the splash.
        //     $timeout(function() {
        //         vm.showSplash = false;
        //     }, 1000);
        // }

        // /**
        //  * get tabs from the tabs manager
        //  *
        //  * @return {[type]} [description]
        //  */
        // function getTabs() {
        //     vm.tabs = tabs;
        // }

    }
})();
