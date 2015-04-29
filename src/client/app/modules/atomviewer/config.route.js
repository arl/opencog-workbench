(function() {
    'use strict';

    angular
        .module('components.atomviewer')
        .run(appRun);

    /* @ngInject */
    function appRun(routeHelper, atomviewerConstants, logger) {

        var moduleConstants = atomviewerConstants;

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
                        'atomviewer@tab': {
                            templateUrl: 'app/modules/atomviewer/atomviewer.html',
                            controller: 'Atomviewer as vm'
                        }
                    },
                    data: {
                        nav: 1,
                        faIcon: moduleConstants.faIcon,                        
                        content: '<i class="fa ' + moduleConstants.faIcon  + '"></i> ' + moduleConstants.name
                    },
                    resolve: {
                        bar: function() {
                            console.log('resolving "bar" for tab.atomviewer...');
                            return 'bar';
                        }
                    },
                    title: moduleConstants.name,
                    deepStateRedirect: true,
                    sticky: true,
                    onEnter: function() {
                        logger.info('Entering Atomspace Viewer');
                    },
                    onExit: function() {
                        logger.info('Exiting Atomspace Viewer');
                    }
                }
            }
        ];

        routeHelper.configureRoutes(routes);
    }

})();
