(function() {
    'use strict';

    angular
        .module('modules.avengers')
        .run(appRun);

    /* @ngInject */
    function appRun(menuhelper, avengersConstants) {
        var moduleConstants = avengersConstants;
        var menus = [
            {
                id: 'avengersmenu1',
                title: 'avengers menu1',
                items: [
                    {
                        id: 'subitem1.1',
                        content: 'Item 1',
                        handler: angular.noop
                    },
                    {
                        id: 'subitem1.2',
                        content: 'Item 2',
                        handler: angular.noop
                    }
                ]

            },
            {
                id: 'avengersmenu2',
                title: 'avengers menu2',
                items: [
                    {
                        id: 'subitem2.1',
                        content: 'Item 1',
                        handler: angular.noop
                    },
                    {
                        id: 'subitem2.2',
                        content: 'Item 2',
                        handler: angular.noop
                    }
                ]

            }       
        ];
        menuhelper.configureMenus(moduleConstants.name, menus);
    }

})();
