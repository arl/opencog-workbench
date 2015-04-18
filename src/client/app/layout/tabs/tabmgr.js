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
    function TabMgr($http, $location, $q, exception, logger, routeHelper, $stickyState, _) {

        var mainRoutes = routeHelper.getMainRoutes();
        var tabs = [];

        // routeHelper.notifyStateChanges(function (toState, toParams, fromState, fromParams) {            
        //     createTabs(toState, toParams, fromState, fromParams);
        // });
        
        var service = {
            addTab: addTab,
            isTabOpen: isTabOpen,
            getTabs: getTabs,
            closeTab: closeTab
        };

        return service;

        function closeTab(tab) {
            
            // 2 cases : 
            // 1. we are closing the active tabs 
            // 2. we are closing another tab 

            console.error('there is something else to do here...!');
            //$stickyState.reset(tab.state);
            var test = true;
        }

        function isTabOpen(state) {

            // check that this state has not already his tab
            return _.some(tabs, function(t) {
                return t.state === state.name
                });
        }

        function addTab(state) {

                   tabs.push({
                    'active': _.contains(['active', 'entered'], state.status),
                    'state': state.name,
                    'heading': state.title,
                    'faIcon': state.data.faIcon,
                    'url': state.url
                });  

            // OLD VERSION
            /*
            var prevTabs = angular.copy(tabs);
            tabs.length = 0;
            for (var idx = 0; idx < mainRoutes.length; idx++) {

                var route = mainRoutes[idx];
                if (!!route.status) {
                    tabs.push({
                        'active': _.contains(['active', 'entered'], route.status),
                        'state': route.name,
                        'heading': route.title,
                        'faIcon': route.data.faIcon,
                        'url': route.url
                    });
                }
            }  
            */        
        }

        function createTabs(toState, toParams, fromState, fromParams) {
/*
            if (!!toState.status) {
                // check that this state has not already his tab
                if (_.every(tabs, function(t) { t.state != toState.name })) {
                   tabs.push({
                    'active': _.contains(['active', 'entered'], route.status),
                    'state': route.name,
                    'heading': route.title,
                    'faIcon': route.data.faIcon,
                    'url': route.url
                });                
               }
           }
*/
            // OLD VERSION
            var prevTabs = angular.copy(tabs);
            tabs.length = 0;
            for (var idx = 0; idx < mainRoutes.length; idx++) {

                var route = mainRoutes[idx];
                if (!!route.status) {
                    tabs.push({
                        'active': _.contains(['active', 'entered'], route.status),
                        'state': route.name,
                        'heading': route.title,
                        'faIcon': route.data.faIcon,
                        'url': route.url
                    });
                }
            }          
        }

        function getTabs() {

            return tabs;
        }

    }
})();
