(function() {
    'use strict';

    angular
        .module('app.dummymodule')
        .factory('dummymenus', dummymenus)
        .run(appRun);

    /* @ngInject */
    function dummymenus(dummymoduleConstants) {
        var moduleConstants = dummymoduleConstants;

        // set to noop the menu handler delegate, in case nobody is interested by it...
        var callDummyDelegate = angular.noop;
        var menus = [
            {
                title: 'dummymodule menu',
                items: [
                    {   
                        menuid: moduleConstants.id + 'item1.1',
                        content: 'call Dummy',
                        action: function() { callDummyDelegate(); }
                    }
                ]
            }
        ];
        var service = {
            getModuleMenus: getModuleMenus,

            // set 'call dummy' delegate
            onCallDummy: function(delegate) {
                callDummyDelegate = delegate;
            }
        };

        return service;
        ///////////////

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