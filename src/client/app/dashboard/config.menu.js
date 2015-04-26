(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    /* @ngInject */
    function appRun(menuhelper, dashboardConstants) {
        var moduleConstants = dashboardConstants;
        var menus = [
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
        menuhelper.configureMenus(dashboardConstants.name, menus);
    }

})();