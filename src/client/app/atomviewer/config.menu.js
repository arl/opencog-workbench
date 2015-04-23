(function() {
    'use strict';

    angular
        .module('app.atomviewer')
        .run(appRun);

    /* @ngInject */
    function appRun(menuhelper, atomviewerConstants) {
        menuhelper.configureMenus(atomviewerConstants.name, getMenus());
    }

    function getMenus() {
        return [
            {
                title: 'atomviewer menu',
                items: [
                    {
                        content: 'subitem1.1',
                        url: ''                    
                    }
                ]

            }
        ];
    }
})();