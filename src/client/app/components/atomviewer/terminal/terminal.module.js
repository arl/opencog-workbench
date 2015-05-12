(function() {
    'use strict';

    angular
        .module('components.atomviewer.terminal', ['ngDragDrop'])
        .directive('jqueryTerminal', jqueryTerminal);


        /* @ngInject */
        function jqueryTerminal() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'app/components/atomviewer/terminal/terminal.html',

                /* taken from http://jsfiddle.net/x8qy3kvk/1/ */
                link: function (scope, elem, attrs) {
                    $(elem).terminal(function (cmd, term) {}, {prompt: '$ ', greetings: false});
                }
            };
        }

})();
