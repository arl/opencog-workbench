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
            openTab: openTab,
            getTabs: getTabs,
            closeTab: closeTab
        };

        return service;
        ///////////////

        /**
         * open a tab corresponding to given state
         *
         *  if tab is present, set it as active
         *  or open a new tab and activate it
         *
         * @param {Object} state state representing the tab to open
         */
        function openTab(state) {

            if (isTabPresent(state)) {
                setTabActive(state);
            } else {
                tabs.push({'state' : state, 'active' : true});
            }
        }

        /**
         * return all opened tabs
         *
         * @return {[type]} [description]
         */
        function getTabs() {

            return tabs;
        }

        function closeTab(tab) {
            
            // 2 cases : 
            // 1. we are closing the active tabs 
            // 2. we are closing another tab 

            console.info('BEFORE CLOSING TAB :' + tab.state.name);

            $stickyState.reset(tab.state.name);
            removeTab(tab.state);
            if (tab.active) {
                // close tab and set another one as active
            } else {
                // just close tab
            }
            console.info('AFTER CLOSING TAB :' + tab.state.name);
        }

        ///////////////

        /**
         * check if given state already has a tab 
         *
         * @param  {Object}  state 
         *
         * @return {Boolean}       tab present?
         */
        function isTabPresent(state) {

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
        function setTabActive(state) {
            _.each(tabs, function(t) {
                t.active = (t.state.name == state.name);
            });
        }

        /**
         * remove tab corresponding to state given as argument
         *
         * @param  {Object} state [state which tab will be removed]
         */
        function removeTab(state) {
            tabs = _.filter(tabs, function(t) {
                return t.state.name !== state.name;
            });
        }        

    }
})();
