(function() {
    'use strict';

    angular
        .module('app.layout.topnav')
        .directive('checkboxMenuitem', checkboxMenuitem)
        .directive('radioMenuitem', radioMenuitem);

    /* @ngInject */
    function checkboxMenuitem () {
        var directive = {
            restrict: 'A',
            replace: true,
            scope : {
                'model': '=',
                'content': '='
            },
            template : getTemplate()
        };
        return directive;

        function getTemplate() {
            return new Array(
                '<a ng-click="model = !model"><i ng-class="model?',
                '\'fa fa-check-square-o\'', ':', '\'fa fa-square-o\'',
                '"></i> {{content}}</a>'
                ).join('');
        }
    }

    /* @ngInject */
    function radioMenuitem () {
        var directive = {
            restrict: 'A',
            replace: true,
            scope : {
                'model': '=',
                'content': '='
            },
            template : getTemplate()
        };
        return directive;

        function getTemplate() {
            return new Array(
                '<a ng-click="model = !model"><i ng-class="model?',
                '\'fa fa-check-square-o\'', ':', '\'fa fa-square-o\'',
                '"></i> {{content}}</a>'
                ).join('');
        }
    }    
})();
