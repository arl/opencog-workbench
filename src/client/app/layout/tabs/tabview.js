(function() {
    'use strict';

    angular
        .module('app.layout.tabs')
        .directive('tabView', tabView);

    /**
     * tabView directive generates the ui-view tags for the tabs
     * this allows us to not have to hard-code anything about the workbench
     * components in the app.layout module
     */
    /* @ngInject */
    function tabView($compile, routeHelper, _) {

        function generateTemplate() {
            return _.map(routeHelper.getMainRoutes(), function(route) {

                // generate the series of ui-view div's from the main routes
                return new Array(
                    '<div class="container shuffle-animation" ',
                    'ui-view="', route.url, '" ',
                    'ng-show="tVm.isActive(\'', route.name, '\')">',
                    '</div>'
                    ).join('');
            }).join('\n');
        }

        // very simple directive with precompiled template
        return {
            restrict: 'E',
            // inject main routes into returned object...
            template: generateTemplate()
        };

    }

})();