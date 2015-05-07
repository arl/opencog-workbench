(function() {
    'use strict';

    angular
        .module('components.atomviewer.importexport', [])
        .directive('importView', importView)
        .directive('exportView', exportView);

    /* @ngInject */
    function importView () {
        return {
            restrict: 'AE',
            templateUrl : 'app/components/atomviewer/importexport/import.html'
        };
    }

    /* @ngInject */
    function exportView () {
        return {
            restrict: 'AE',
            templateUrl : 'app/components/atomviewer/importexport/export.html'
        };
    }
 })();
