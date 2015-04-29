(function() {
    'use strict';

    angular
        .module('app.layout.tabs')
        .directive('tabView', tabView);


    // if directive works => place it in its own file tabview.js
    /* @ngInject */
    function tabView($compile, routeHelper) {

        return {
            restrict: 'E',
            compile: compile,
            // inject main routes into returned object...
            mainRoutes : routeHelper.getMainRoutes()
        };

        function compile ($elem, attrs, transclude) {
            
            // ... so we can access it from here
            var html = _.map(this.mainRoutes, function(route) {

                // and generate the series of ui-view's
                return new Array(
                    '<div class="container shuffle-animation" ',
                    'ui-view="', route.url, '" ',
                    'ng-show="tVm.isActive(\'', route.name, '\')">',
                    '</div>'
                    ).join('');
            }).join('\n');

            $elem.html(html);
        }
    };
})();