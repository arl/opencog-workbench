(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    /* @ngInject */
    function appRun(routeHelper, dashboardConstants) {

        var moduleConstants = dashboardConstants;

        // module routes definition
        var routes = [
            {
                /**
                 * main state (module parent state),
                 * in case the module uses various states, parent state
                 * should be declared first
                 */
                state: 'tab.' + moduleConstants.id,
                config: {
                    url: moduleConstants.id,
                    views: {
                        'dashboard@tab': {
                            templateUrl: 'app/dashboard/dashboard.html',
                            controller: 'Dashboard as vm'
                        }
                    },
                    data: {
                        nav: 1,
                        faIcon: moduleConstants.faIcon,                        
                        content: '<i class="fa ' + moduleConstants.faIcon  + '"></i> ' + moduleConstants.name
                    },
                    resolve: {
                        bar: function() {
                            console.log('resolving "bar" for tab.dashboard...');
                            return 'bar';
                        }
                    },
                    title: moduleConstants.name,
                    deepStateRedirect: true,
                    sticky: true
                }
            }
        ];

        routeHelper.configureRoutes(routes);
    }

})();
