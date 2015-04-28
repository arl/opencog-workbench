(function() {
    'use strict';

    angular
        .module('modules.dummy')
        .run(appRun);

    /* @ngInject */
    function appRun(routeHelper, dummyConstants, logger) {

        var moduleConstants = dummyConstants;

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
                        'dummy@tab': {
                            templateUrl: 'app/dummy/dummymodule.html',
                            controller: 'DummyCtrl as vm'
                        }
                    },
                    data: {
                        nav: 1,
                        faIcon: moduleConstants.faIcon,                        
                        content: '<i class="fa ' + moduleConstants.faIcon  + '"></i> ' + moduleConstants.name
                    },
                    resolve: {
                        baz: function() {
                            console.log('resolving "baz" for tab.dummy...');
                            return 'baz';
                        }
                    },
                    title: moduleConstants.name,
                    deepStateRedirect: true,
                    sticky: true,
                    onEnter: function() {
                        logger.info('Entering Dummy Module');
                    },
                    onExit: function() {
                        logger.info('Exiting Dummy Module');
                    }
                }
            }
        ];

        routeHelper.configureRoutes(routes);
    }

})();
