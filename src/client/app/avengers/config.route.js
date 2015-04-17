(function() {
    'use strict';

    angular
        .module('app.avengers')
        .run(appRun);

    /* @ngInject */
    function appRun(routeHelper, avengersConstants) {

        var moduleConstants = avengersConstants;

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
                        'avengers@tab': {
                            templateUrl: 'app/avengers/avengers.html',
                            controller: 'Avengers as vm'
                        }
                    },
                    data: {
                        nav: 2,
                        faIcon: moduleConstants.faIcon,
                        content: '<i class="fa ' + moduleConstants.faIcon  + '"></i> ' + moduleConstants.name
                    },
                    resolve: {
                        foo: function() {
                            console.log('resolving "foo" for tab.avengers...');
                            return 'foo';
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