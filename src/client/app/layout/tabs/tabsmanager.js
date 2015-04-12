(function() {
    'use strict';

    angular
        .module('app.layout.tabs')
        .factory('TabsManager', TabsManager)
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
    function TabsManager($http, $location, $q, exception, logger) {

        var tabs = [];

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

        function getAllTabs() {
            var count = 0;
            return tabs();
        }

    }
})();
