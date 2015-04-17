(function() {
    'use strict';

    angular
        .module('app.layout.tabs')
        .factory('TabMgr', TabMgr)
        .run(appRun);

    /* @ngInject */
    function appRun(routeHelper) {
        // register the tab state (parent of the main state of every module)
        routeHelper.configureRoutes(getStates());
    }

    function getStates() {
        return [
            {
                state: 'tab',
                config : {
                    url: '/',
                    views: {
                        '@': {
                            controller: 'Tabs as tVm',
                            templateUrl: 'app/layout/tabs/tabs.html'
                        }   
                    }                    
                }
            }
        ];
    }

    /* @ngInject */
    function TabMgr($http, $location, $q, exception, logger, routeHelper) {

        var mainRoutes = routeHelper.getMainRoutes();
        var tabs = [];
        routeHelper.notifyStateChanges(function () {
            
            createTabs();
        });
        
        var service = {
            addTab: addTab,
            getAllTabs: getAllTabs,
            closeTab: closeTab
        };

        return service;

        function addTab() {
            
        }

        function closeTab() {
            
        }

        function createTabs() {    
            tabs.length = 0;
            for (var idx = 0; idx < mainRoutes.length; idx++) {

                var route = mainRoutes[idx];
                if (!!route.status) {
                    tabs.push({
                        'heading': route.title,
                        'active': route.status === 'active',
                        'state': route.name
                    });
                }

            }          
        }

        function getAllTabs() {
            if (tabs.length === 0) {
                createTabs();
            }
            return tabs;
        }

    }
})();
