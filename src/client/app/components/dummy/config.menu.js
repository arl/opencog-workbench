(function() {
    'use strict';

    angular
        .module('components.dummy')
        .run(appRun);

    /* @ngInject */
    function appRun(menuhelper, dummyConstants) {
        var moduleConstants = dummyConstants;

        // define our component menus
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
                        model: true // checkbox default value
                    },

                    // header menu item
                    {
                        type: 'header',
                        content: 'Radio'
                    },

                    // radio menu item
                    {
                        id: 'radioitem',
                        type: 'radio',
                        content: [
                            'Item 0', 'Item 1', 'Item 2', 'Item 3'
                        ],
                        model: 2 // default selection : content[2] -> 'Item 2'
                    }
                ]
            }
        ];

        // declare them to the menuhelper
        menuhelper.configureMenus(moduleConstants.id, menus);
    }

})();