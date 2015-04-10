(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('tabsmanager', tabsmanager);

    /* @ngInject */
    function tabsmanager($http, $location, $q, exception, logger) {

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
