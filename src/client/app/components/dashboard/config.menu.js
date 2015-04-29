(function() {
    'use strict';

    angular
        .module('components.dashboard')
        .run(appRun);

    /* @ngInject */
    function appRun(menuhelper, dashboardConstants) {
        var moduleConstants = dashboardConstants;
        var menus = [
            {
                id: 'dashboardmenu',
                title: 'dashboard menu',
                items: [
                    {
                        id: 'stuff1',
                        content: 'Stuff 1',
                        handler: angular.noop
                    },
                    {
                        id: 'stuff2',
                        content: 'Stuff 2',
                        handler: angular.noop
                    },
                    {
                        id: 'stuff3',
                        content: 'Stuff 3',
                        handler: angular.noop
                    }
                ]

            }
        ];
        menuhelper.configureMenus(dashboardConstants.name, menus);
    }

})();