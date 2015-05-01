(function() {
    'use strict';

    angular
        .module('components.dummy')
        .factory('DummyMenus', DummyMenus)
        .run(appRun);

    /* @ngInject */
    function DummyMenus(dummyConstants, _) {
        var moduleConstants = dummyConstants;

        // set menu handler to noop, in case nobody is interested..
        var dummyClickHandler = angular.noop;
        var dummyChkValue = true;

        var menus = [
            {
                id: 'examplemenu',
                title: 'Example Items',
                items: [
                    // simple menu item with handler
                    {   
                        id: 'simpleitem',
                        type: 'simple',
                        content: 'Dummy',
                        handler: function() {
                            dummyClickHandler();
                        }
                    },
                    //  checkbox menu item
                    {
                        id: 'checkboxitem',
                        type: 'checkbox',
                        content: 'Dummy Check',
                        model: dummyChkValue
                    }
                ]
            }
        ];

        var service = {
            getModuleMenus: function() { return menus; },

            // set 'call dummy' handler
            onClickDummy: function(handler) {
                dummyClickHandler = handler;
            },
            getDummyChkValue: function () {
                var menu = _.find(menus, function(menu) { return menu.id === 'examplemenu'; });
                var item = _.find(menu.items, function(item) { return item.id === 'checkboxitem'; });
                return item.model;
            }
        };

        return service;
        ///////////////

    }

    /* @ngInject */
    function appRun(menuhelper, dummyConstants, DummyMenus) {
        var moduleConstants = dummyConstants;
        menuhelper.configureMenus(moduleConstants.name, DummyMenus.getModuleMenus());
    }

})();