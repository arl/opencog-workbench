(function() {
    'use strict';

    angular
        .module('app.dummymodule')
        .factory('dummymenus', dummymenus)
        .run(appRun);

    /* @ngInject */
    function dummymenus(dummymoduleConstants) {
        var moduleConstants = dummymoduleConstants;
        var _callDummyCb = angular.noop;
        var menus = [
            {
                title: 'dummymodule menu',
                items: [
                    {   
                        menuid: moduleConstants.id + 'item1.1',
                        content: 'call Dummy',
                        action: callDummy
                    }
                ]
            }
        ];
        var service = {
            getModuleMenus: getModuleMenus,

            // call dummy menu click handling
            onCallDummy: function(cb) {
                _callDummyCb = cb;
            }
        };

        return service;
        ///////////////

        function callDummy() {
            _callDummyCb();
        }

        function getModuleMenus() {
            return menus;
        }
    }


    /* @ngInject */
    function appRun(menuhelper, dummymoduleConstants, dummymenus) {
        var moduleConstants = dummymoduleConstants;
        menuhelper.configureMenus(moduleConstants.name, dummymenus.getModuleMenus());
    }

})();