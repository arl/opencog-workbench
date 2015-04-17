(function() {
    'use strict';

    angular
        .module('app.layout.tabs')
        .factory('TabMgr', TabMgr)
        .run(appRun);

    /* @ngInject */
    function appRun(routeHelper) {
        // register the tab state (parent state of every module main state)
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
            getTabs: getTabs,
            closeTab: closeTab
        };

        return service;

        function closeTab() {
            

            // FOR THE CLOSE TABS FEATURE AND ALSO TO ADD ICON TO TABS, LOOK AT this:
            // http://jsfiddle.net/alfrescian/ZE9cE/
            // IF WE SEPARATE 
        }

        function createTabs() {    
            tabs.length = 0;
            for (var idx = 0; idx < mainRoutes.length; idx++) {

                var route = mainRoutes[idx];
                if (!!route.status) {
                    tabs.push({
                        'active': route.status === 'active',
                        'state': route.name,
                        'heading': route.title,
                        'faIcon': route.data.faIcon
                    });
                }

            }          
        }

        function getTabs() {
            if (tabs.length === 0) {
                createTabs();
            }
            return tabs;
        }

    }
})();
