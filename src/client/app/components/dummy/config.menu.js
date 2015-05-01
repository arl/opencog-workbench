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
                        content: 'Dummy'
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

        console.warn('we probably have to remove back DummyMenus factory as its sole purpose was to hold the handlers and values bound to menu items, and this is not necessary any more since we use menuhelpers functions for this');

        var service = {
            getModuleMenus: function() { return menus; },

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
        menuhelper.configureMenus(moduleConstants.id, DummyMenus.getModuleMenus());
    }

})();