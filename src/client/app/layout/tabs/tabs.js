(function() {
    'use strict';

    angular
        .module('app.layout.tabs')
        .controller('Tabs', Tabs);

    // Tabs.$inject = ['$scope', 'config', 'logger', '$state'];

    /* @ngInject */
    function Tabs($scope, config, logger, $state, TabMgr) {
        /*jshint validthis: true */
        var vm = this;
        // vm.tabs = [
        //     {title:'Dynamic Title 1', content:'Dynamic content 1'},
        //     {title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true}
        // ];



        if ($state.current.name === 'tab')
          $state.go(".dashboard");


        $scope.$on('$stateChangeSuccess', function(toState) {
        
          if ($state.current.name === 'tab')
            $state.go(".dashboard");
          // else if ($state.includes("top") && !$state.is("top")) {
          //   ctrl.selected = $state.current.name.split(".").slice(1, 2).pop();
          // }
        })



        vm.gotoTab = function(tab) {

            var defineHereStateToGoWithTheHelpOfTabVariable = '';
            $state.go(defineHereStateToGoWithTheHelpOfTabVariable);

            // taken from sticky example : top.html
            // <li ng-class="{active: $state.includes('top.people')}" ><a ui-sref="top.people">Personnel</a></li>
            // <li ng-class="{active: $state.includes('top.inv')}" ><a ui-sref="top.inv">Inventory</a></li>
            // <li ng-class="{active: $state.includes('top.cust')}" ><a ui-sref="top.cust">Customers</a></li>
        };

        // should return if we show this tab or not (maybe we can directly do it
        // in the expression ng-show in template?)
        vm.showTab = function(tab) {

            var shouldShowTab = $state.includes(tab);
            return shouldShowTab;
        };

        // get all tabs
        vm.getTabs = function(tab) {

            return TabMgr.getAllTabs();
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
