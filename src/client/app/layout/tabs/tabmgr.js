(function() {
    'use strict';

    angular
        .module('app.layout.tabs')
        .factory('TabMgr', TabMgr)
        .run(appRun);

    /* @ngInject */
    function appRun(routeHelper) {
        var rootState =  [
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

        // register the tab state (parent state of every module main state)
        routeHelper.configureRoutes(rootState);
    }

    /* @ngInject */
    function TabMgr($http, $location, $q, exception, routeHelper, $state, _) {

        var tabs = [];

        var service = {
            openTab: openTab,
            getTabs: getTabs,
            getActiveTab: getActiveTab,
            closeTab: closeTab
        };

        return service;
        ///////////////

        /**
         * open a tab corresponding to given state
         * @note if tab is present, set it as active
         *       or open a new tab and activate it
         * @param {Object} state state representing the tab to open
         */
        function openTab(state) {
            if (isTabPresent(state)) {
                setActiveTab(state);
            } else {
                // as we now have more than one tab, anyone can be closed
                tabs.push({'state' : state, 'active' : true});
                updateTabClosing();
            }
        }

        /**
         * return all opened tabs
         * @return {Array} array of tabs
         */
        function getTabs() {
            return tabs;
        }

        function closeTab(tab) {
            
            function deleteTab(tab) {
                removeTab(tab.state);
                routeHelper.resetState(tab.state.name);
                updateTabClosing();
            }

            if (tab.active) {
                // force transition to the first inactive tab we find
                var newState = _.find(tabs, function(t) { return !t.active; });
                $state.go(newState.state.name).then(
                    function (result) {
                        // promise resolved, we can delete the tab
                        deleteTab(tab);
                    },
                    function (error) {
                        console.error(error);
                    });
            } else {
                // we can directly delete the tab
                deleteTab(tab);
            }
        }

        /**
         * get active tab, if any
         * @return {Object}     active tab or undefined
         */
        function getActiveTab() {
            // check that this state has not already his tab
            return _.find(tabs, function(t) {
                return t.active;
            });
        }

        ///////////////

        /**
         * check if given state already has a tab 
         * @param  {Object}  state 
         * @return {Boolean} is tab present?
         */
        function isTabPresent(state) {
            // check that this state has not already his tab
            return _.some(tabs, function(t) {
                return t.state.name === state.name;
            });
        }

        /**
         * set as active the tab corresponding to state given as argument
         * @param  {Object} state state which tab will be activated
         */
        function setActiveTab(state) {
            _.each(tabs, function(t) {
                t.active = (t.state.name === state.name);
            });
        }

        /**
         * remove tab corresponding to state given as argument
         * @param  {Object} state state which tab will be removed
         */
        function removeTab(state) {
            tabs = _.filter(tabs, function(t) {
                return t.state.name !== state.name;
            });
        }

        /**
         * update closeEnabled flag on all tabs
         */
        function updateTabClosing() {
            // disable closing if only one tab opened
            if (tabs.length === 1) {
                tabs[0].closeEnabled = false;
            } else {
                _.each(tabs, function(t) {
                    t.closeEnabled = true;
                });                
            }
        }        

    }
})();
