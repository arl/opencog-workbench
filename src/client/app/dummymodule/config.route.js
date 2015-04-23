(function() {
    'use strict';

    angular
        .module('app.dummymodule')
        .run(appRun);

    /* @ngInject */
    function appRun(routeHelper, dummymoduleConstants, logger) {

        var moduleConstants = dummymoduleConstants;

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
                        'dummymodule@tab': {
                            templateUrl: 'app/dummymodule/dummymodule.html',
                            controller: 'Dummymodule as vm'
                        }
                    },
                    data: {
                        nav: 1,
                        faIcon: moduleConstants.faIcon,                        
                        content: '<i class="fa ' + moduleConstants.faIcon  + '"></i> ' + moduleConstants.name
                    },
                    resolve: {
                        baz: function() {
                            console.log('resolving "baz" for tab.dummymodule...');
                            return 'baz';
                        }
                    },
                    title: moduleConstants.name,
                    deepStateRedirect: true,
                    sticky: true,
                    onEnter: function() {
                        logger.info('Entering DummyModule View');
                    },
                    onExit: function() {
                        logger.info('Exiting DummyModule View');
                    }
                }
            }
        ];

        routeHelper.configureRoutes(routes);
    }

})();
