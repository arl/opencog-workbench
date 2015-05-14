(function() {
    'use strict';

    angular
        .module('blocks.menu')
        .directive('checkboxMenuitem', checkboxMenuitem)
        .directive('radioMenuitem', radioMenuitem);

    /* @ngInject */
    function checkboxMenuitem () {
        var directive = {
            restrict: 'A',
            replace: true,
            scope : {
                'subm' : '='
            },
            template : getTemplate(),
            link: link
        };
        return directive;

        function getTemplate() {
            return new Array(
                '<a data-ng-click="onClick()">',
                '<i data-ng-class="subm.model?',
                '\'fa fa-check-square-o\'', ':', '\'fa fa-square-o\'',
                '"></i>',
                ' {{subm.content}}</a>'
                ).join('');
        }

        function link(scope, element, attrs) {

            scope.onClick = function () {
                // toggle checkbox state
                scope.subm.model = !scope.subm.model;

                // call handler if any
                if (scope.subm.handler) {
                    scope.subm.handler(scope.subm.model);
                }
            };
        }
    }

    /* @ngInject */
    function radioMenuitem (_) {
        var directive = {
            restrict: 'A',
            replace: true,
            scope : {
                'model': '&model',
                'content': '=',
                'handler': '='
            },
            template : getTemplate,
            link: link
        };
        return directive;

        function getTemplate(element, attrs) {

            return new Array(
                '<a ',
                '   data-ng-click="onClick()">',
                '<i data-ng-class="selModel[index]?',
                '\'fa fa-check-square-o\'', ':', '\'fa fa-square-o\'',
                '"></i>',
                ' {{content}}</a>'
                ).join('');
        }

        function link(scope, element, attrs) {

            // create the selection model in directive parent scope...
            if (!scope.$parent.$parent.$parent.selModel) {
                scope.$parent.$parent.$parent.selModel = [];
            }
            // ...keep a reference in directive scope
            scope.selModel = scope.$parent.$parent.$parent.selModel;
            // reference radio element index in scope
            scope.index = scope.$parent.$parent.$index;
            // add default state
            scope.selModel.push(scope.model());

            scope.onClick = function () {

                // reset each element of the model
                scope.selModel.forEach(function(val, idx, arr) {
                    arr[idx] = false;
                });
                // set the one corresponding to current directive
                scope.selModel[$scope.index] = true;
                // call handler if any
                if (scope.handler) {
                    scope.handler(scope.index);
                }
            };
        }
    }    
})();
