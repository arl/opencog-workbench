(function() {
    'use strict';

    angular
        .module('components.atomviewer.help', [])
        .directive('helpView', helpView)
        .directive('aboutView', aboutView);

    /* @ngInject */
    function helpView () {
        return {
            restrict: 'AE',
            templateUrl : 'app/components/atomviewer/help/help.html'
        };
    }

    /* @ngInject */
    function aboutView () {
        return {
            restrict: 'AE',
            templateUrl : 'app/components/atomviewer/help/about.html'
        };
    }
})();
