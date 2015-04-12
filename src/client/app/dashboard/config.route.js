(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    // appRun.$inject = ['stateHelper'];

    /* @ngInject */
    function appRun(stateHelper) {
        stateHelper.configureStates(getStates());
    }


    function getStates() {
        return [
            {
                state: 'tab.dashboard',             
                config: {
                    url: 'dashboard',
                    views: {
                        'dashboard@tab': {
                            templateUrl: 'app/dashboard/dashboard.html',
                            controller: 'Dashboard as vm'
                        }
                    },
                    data: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    },
                    resolve: {
                        bar: function() {
                            console.log("resolving 'bar' for tab.dashboard...");
                            return "bar";
                        }
                    },
                    title: 'Dashboard Component',
                    deepStateRedirect: true,
                    sticky: true
                }
            }
        ];
    }
})();
