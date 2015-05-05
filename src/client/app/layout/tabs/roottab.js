(function() {
    'use strict';

    angular
        .module('app.layout.tabs')
        .controller('RootTab', RootTab);

    /**
     * controller of our root state ('tab' state : '/')
     */
    /* @ngInject */
    function RootTab($scope, $state, TabMgr) {
        /*jshint validthis: true */
        var vm = this;

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
