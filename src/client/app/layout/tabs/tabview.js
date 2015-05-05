(function() {
    'use strict';

    angular
        .module('app.layout.tabs')
        .directive('tabView', tabView);

    /**
     * tabView directive generates the serie of ui-view tags that keep the 
     * state of components for which a tab is opened (sticky states)
     * doing this allow us to know nothing about the workbench components
     * in the app.layout module
     */
    /* @ngInject */
    function tabView($compile, routeHelper, $state, _) {

        return {
            restrict: 'E',
            template: generateTemplate(),
            link: link
        };

        // generate template at directive instantiation
        function generateTemplate() {
            return _.map(routeHelper.getMainRoutes(), function(route) {

                // generate the series of ui-view div's from the main routes
                return new Array(
                    '<div class="container shuffle-animation" ',
                    'ui-view="', route.url, '" ',
                    'ng-show="$state.includes(\'', route.name, '\')">',
                    '</div>'
                    ).join('');

            }).join('\n');
        }

        // just add $state to the scope
        function link($scope, $element, $attrs) {
            $scope.$state = $state;
        }
    }

})();