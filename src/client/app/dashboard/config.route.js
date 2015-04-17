(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    /* @ngInject */
    function appRun(routeHelper, dashboardConstants) {

        // module routes definition
        var routes = [
            {
                /**
                 * main state (module parent state),
                 * in case the module uses various states, parent state
                 * should be declared first
                 */
                state: 'tab.' + dashboardConstants.id,
                config: {
                    url: dashboardConstants.id,
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
                            console.log('resolving "bar" for tab.dashboard...');
                            return 'bar';
                        }
                    },
                    title: dashboardConstants.name,
                    deepStateRedirect: true,
                    sticky: true
                }
            }
        ];

        routeHelper.configureRoutes(routes);
    }

})();
