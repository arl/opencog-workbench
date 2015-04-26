(function() {
    'use strict';

    angular
        .module('app.dummymodule')
        .factory('dummymenus', dummymenus)
        .run(appRun);

    /* @ngInject */
    function dummymenus(dummymoduleConstants) {
        var moduleConstants = dummymoduleConstants;

        // set to noop the menu handler, in case nobody is interested by it...
        var dummyClickHandler = angular.noop;
        var dummyChkHandler = angular.noop;
        var dummyChkValue = true;


        var menus = [
            {
                title: 'dummymodule menu',
                items: [
                    {   
                        type: 'simple',
                        content: 'Dummy',
                        handler: function() { dummyClickHandler(); }
                    },
                    {
                        type: 'checkbox',
                        content: 'Dummy Check',
                        model: dummyChkValue,
                        handler: function(val) {
                            dummyChkHandler(val);
                        }
                    }
                ]
            }
        ];
        var service = {
            getModuleMenus: getModuleMenus,

            // set 'call dummy' handler
            onClickDummy: function(handler) {
                dummyClickHandler = handler;
            },
            // set 'dummy check' change handler
            onChangeDummyChk: function(handler) {
                dummyChkHandler = handler;
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