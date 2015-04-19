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

        // var mainRoutes = routeHelper.getMainRoutes();
        var tabs = [];

        // routeHelper.notifyStateChanges(function (toState, toParams, fromState, fromParams) {            
        //     createTabs(toState, toParams, fromState, fromParams);
        // });
        
        var service = {
            addTab: addTab,
            setActiveTab: setActiveTab,
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
            

//             $stickyState.reset(tab.state);
//             tabs.
// _.filter(data, function(item) { return !!item.weight; });
//             var test = true;
        }

        function isTabOpen(state) {

            // check that this state has not already his tab
            return _.some(tabs, function(t) {
                return t.state.name === state.name
            });
        }

        /**
         * set as active the tab corresponding to state given as argument
         *
         * @param  {Object} state [state which tab will be activated]
         */
        function setActiveTab(state) {
            _.each(tabs, function(t) {
                t.active = (t.state.name == state.name);
            });
        }

        /**
         * add a new Tab
         *
         * @param {Object} state state representing the tab to open
         */
        function addTab(state) {

           tabs.push({'state' : state, 'active' : true});
        }

        /**
         * return all opened tabs
         *
         * @return {[type]} [description]
         */
        function getTabs() {

            return tabs;
        }

    }
})();
