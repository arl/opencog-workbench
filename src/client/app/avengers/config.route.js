(function() {
    'use strict';

    angular
        .module('app.avengers')
        .run(appRun);

    /* @ngInject */
    function appRun(routeHelper, avengersConstants) {

        // module routes definition
        var routes = [
            {
                /**
                 * main state (module parent state),
                 * in case the module uses various states, parent state
                 * should be declared first
                 */                
                state: 'tab.' + avengersConstants.id,
                config: {
                    url: avengersConstants.id,
                    views: {
                        'avengers@tab': {
                            templateUrl: 'app/avengers/avengers.html',
                            controller: 'Avengers as vm'
                        }
                    },
                    data: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Avengers'
                    },
                    resolve: {
                        foo: function() {
                            console.log('resolving "foo" for tab.avengers...');
                            return 'foo';
                        }
                    },
                    title: avengersConstants.name,
                    deepStateRedirect: true,
                    sticky: true
                }
            }
        ];
        routeHelper.configureRoutes(routes);
    }

})();