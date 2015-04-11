(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Shell', Shell);

    Shell.$inject = ['$timeout', 'config', 'logger'];

    function Shell($timeout, config, logger) {
        /*jshint validthis: true */
        var vm = this;
        // vm.tabs = [
        //     {title:'Dynamic Title 1', content:'Dynamic content 1'},
        //     {title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true}
        // ];
        var tabs = [{
            heading: 'Dashboard',
            route: 'dashboard',
            id: 'dashboardTab'
        }, {
            heading:'Avengers',
            route: 'avengers',
            id: 'avengersTab'
        }];

        vm.title = config.appTitle;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.showSplash = true;

        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
            // Using a resolver on all routes or dataservice.ready in every controller
            // dataservice.ready().then(function(){
            //     hideSplash();
            // });
            hideSplash();
            getTabs();
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                vm.showSplash = false;
            }, 1000);
        }

        /**
         * get tabs from the tabs manager
         *
         * @return {[type]} [description]
         */
        function getTabs() {
            vm.tabs = tabs;
        }

    }
})();
