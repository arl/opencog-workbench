(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    /* @ngInject */
    function appRun(menuhelper, dashboardConstants) {
        menuhelper.configureMenus(dashboardConstants.name, getMenus());
    }

    function getMenus() {
        return [
            {
                title: 'dashboard menu',
                items: [
                    {
                        content: 'subitem1.1',
                        url: ''                    
                    },
                    {
                        content: 'subitem1.2',
                        url: ''                    
                    },
                    {
                        content: 'subitem1.3',
                        url: ''                    
                    }
                ]

            }
        ];
    }
})();