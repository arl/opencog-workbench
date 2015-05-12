(function() {
    'use strict';

    angular
        .module('components.atomviewer.leftsidebar', [])
        .directive('connectView', connectView)
        .directive('filterView', filterView)
        .directive('advancedFilterView', advancedFilterView)
        .directive('appearanceView', appearanceView)
        .directive('colorsView', colorsView)
        .directive('textView', textView)
        .directive('analyzeView', analyzeView)
        .directive('settingsView', settingsView);

    /* @ngInject */
    function connectView () {
        return {
            restrict: 'AE',
            templateUrl : 'app/components/atomviewer/leftsidebar/connect.html'
        };
    }

    /* @ngInject */
    function filterView () {
        return {
            restrict: 'AE',
            templateUrl : 'app/components/atomviewer/leftsidebar/filter.html'
        };
    }

    /* @ngInject */
    function advancedFilterView () {
        return {
            restrict: 'AE',
            templateUrl : 'app/components/atomviewer/leftsidebar/advanced-filter.html'
        };
    }

    /* @ngInject */
    function appearanceView () {
        return {
            restrict: 'AE',
            templateUrl : 'app/components/atomviewer/leftsidebar/appearance.html'
        };
    }

    /* @ngInject */
    function colorsView () {
        return {
            restrict: 'AE',
            templateUrl : 'app/components/atomviewer/leftsidebar/colors.html'
        };
    } 

    /* @ngInject */
    function textView () {
        return {
            restrict: 'AE',
            templateUrl : 'app/components/atomviewer/leftsidebar/text.html'
        };
    }

    /* @ngInject */
    function analyzeView () {
        return {
            restrict: 'AE',
            templateUrl : 'app/components/atomviewer/leftsidebar/analyze.html'
        };
    }

    /* @ngInject */
    function settingsView () {
        return {
            restrict: 'AE',
            templateUrl : 'app/components/atomviewer/leftsidebar/settings.html'
        };
    }
})();
