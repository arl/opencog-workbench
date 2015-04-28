(function() {
    'use strict';

    angular
        .module('app.layout.topnavmenu')
        .factory('menuhelper', menuhelper)
        .directive('checkboxMenuitem', checkboxMenuitem);

    /* @ngInject */
    function menuhelper() {
        var _menus = [];
        var service = {
            configureMenus: configureMenus,
            getAllMenus: getAllMenus,
            
        };

        return service;
        ///////////////

        /**
         * [configureMenus add menu]
         *
         * @param  {String} component component which menu is being configured
         *                            (should be the same as title of the title element set in config.route.js
         * @param  {Array} menus      menu description
         */
        function configureMenus(component, menus) {
            _menus.push({'component':component, 'menus': menus});
        }

        /**
         * [getAllMenus get all configured menus]
         *
         * @return {[type]} [description]
         */
        function getAllMenus() {
            return _menus;
        }
    }

    /* @ngInject */
    function checkboxMenuitem () {
        var directive = {
            restrict: 'A',
            replace: true,
            scope : {
                'model': '='
            },
            template : getTemplate()
        };
        return directive;

        function getTemplate() {
            return new Array(
                '<a ng-click="model = !model"><i ng-class="model?',
                '\'fa fa-check-square-o\'', ':', '\'fa fa-square-o\'',
                '"></i> Test</a>'
                ).join('');
        }
    }
})();
