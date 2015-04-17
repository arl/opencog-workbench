(function() {
    'use strict';

    angular
        .module('app.layout.tabs')
        .factory('TabMgr', TabMgr)
        .run(appRun);

    /* @ngInject */
    function appRun(stateHelper) {
        // register the tab state (parent of the main state of every module)
        stateHelper.configureStates(getStates());
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
    function TabMgr($http, $location, $q, exception, logger, stateHelper) {

        var allStates = stateHelper.getMainNavStates();
        var tabs = [];
        stateHelper.notifyStateChanges(function () {
            
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
            for (var idx = 0; idx < allStates.length; idx++) {

                var state = allStates[idx];
                if (!!state.status) {
                    tabs.push({
                        'heading': state.name,
                        'active': state.status === 'active',
                        'state': state.name
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
