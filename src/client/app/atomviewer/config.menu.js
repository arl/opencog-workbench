(function() {
    'use strict';

    angular
        .module('app.atomviewer')
        .run(appRun);

    /* @ngInject */
    function appRun(menuhelper, atomviewerConstants) {
        var moduleConstants = atomviewerConstants;
        var menus = [
            {
                id: 'filemenu',
                title: '<i class="fa fa-file"></i> File <span class="caret">',
                items: [
                    {
                        id: 'import',
                        content: '<i class="fa fa-exchange"></i> Import',
                        handler: angular.noop
                    },
                    {
                        id: 'export',
                        content: '<i class="fa fa-exchange"></i> Export',
                        handler: angular.noop
                    }
                ]

            },
            {
                id: 'viewmenu',
                title: '<i class="fa fa-eye"></i> View <span class="caret">',
                items: [
                    {
                        id: '1',
                        content: '<i class="fa fa-exchange"></i> Import',
                        handler: angular.noop
                    },
                    {
                        id: '2',
                        content: '<i class="fa fa-exchange"></i> Export',
                        handler: angular.noop
                    }
                ]

            }            
        ];

        menuhelper.configureMenus(moduleConstants.name, menus);
    }

})();