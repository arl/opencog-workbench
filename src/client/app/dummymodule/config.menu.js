(function() {
    'use strict';

    angular
        .module('app.dummymodule')
        .run(appRun);

    /* @ngInject */
    function appRun(menuhelper, dummymoduleConstants) {
        menuhelper.configureMenus(dummymoduleConstants.name, getMenus());
    }

    function getMenus() {
        return [
            {
                title: 'dummymodule menu',
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