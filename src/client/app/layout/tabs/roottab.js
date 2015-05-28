(function() {
    'use strict';

    angular
        .module('app.layout.tabs')
        .controller('RootTab', RootTab);

    /**
     * controller of our root state ('tab' state : '/')
     */

    

/**
 * @ngdoc controller
 * @name app.RootTab
 * @description
 * This is a sample function
 * @param {number} x - any number, don't matter which
 */
    /* @ngInject */
    function RootTab($scope, $state, TabMgr) {
        /*jshint validthis: true */
        var vm = this;

        activate();

        function activate() {

            // monitor state changes to update tabs
            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                if (!!$state.current.sticky) {
                    TabMgr.openTab($state.current);
                }
            });
        }
    }
})();
