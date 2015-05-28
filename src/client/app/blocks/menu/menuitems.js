(function() {
    'use strict';

    angular
        .module('blocks.menu')
        .directive('checkboxMenuitem', checkboxMenuitem)
        .directive('radioMenuitem', radioMenuitem);


    /**
     * @ngdoc directive
     * @name checkboxMenuitem
     * @restrict A
     *
     * @description
     * The `checkboxMenuitem` create a checkable item in a menu dropdown
     *
     * it it not meant to be used directly, as the dropdown menus are automatically created
     * with menuhelper#configureMenus
     *
     * This directive can be applied only within the scope of an
     * {@link menu.menuhelper#configureMenus ngRepeat}.
     *
     * @element ANY
     * @param {expression} ngClassEven {@link guide/expression Expression} to eval. The
     *   result of the evaluation can be a string representing space delimited class names or an array.
     *
     * @example
       <example>
         <file name="index.html">
            <ol ng-init="names=['John', 'Mary', 'Cate', 'Suz']">
              <li ng-repeat="name in names">
               <span ng-class-odd="'odd'" ng-class-even="'even'">
                 {{name}} &nbsp; &nbsp; &nbsp;
               </span>
              </li>
            </ol>
         </file>
         <file name="style.css">
           .odd {
             color: red;
           }
           .even {
             color: blue;
           }
         </file>
         <file name="protractor.js" type="protractor">
           it('should check ng-class-odd and ng-class-even', function() {
             expect(element(by.repeater('name in names').row(0).column('name')).getAttribute('class')).
               toMatch(/odd/);
             expect(element(by.repeater('name in names').row(1).column('name')).getAttribute('class')).
               toMatch(/even/);
           });
         </file>
       </example>
    */
    /* @ngInject */
    function checkboxMenuitem () {
        var directive = {
            restrict: 'A',
            replace: true,
            scope : { 'subm' : '=' },
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
            scope : { 'subm': '=' },
            template : getTemplate,
            link: link
        };
        return directive;

        function getTemplate(element, attrs) {

            return new Array(
                '<a ',
                '   data-ng-click="onClick()">',
                '<i data-ng-class="$parent.$index === subm.model?',
                '\'fa fa-check-square-o\'', ':', '\'fa fa-square-o\'',
                '"></i>',
                ' {{subm.content[$parent.$index]}}</a>'
                ).join('');
        }

        function link(scope, element, attrs) {

            scope.onClick = function () {

                // set the model corresponding to clicked item index
                scope.subm.model = scope.$parent.$index;
                // call handler if any
                if (scope.subm.handler) {
                    scope.subm.handler(scope.subm.model);
                }
            };
        }
    }
})();
