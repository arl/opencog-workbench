(function() {
    'use strict';

    angular
        .module('components.atomviewer')
        .run(appRun);

    /* @ngInject */
    function appRun(menuhelper, atomviewerConstants) {
        var moduleConstants = atomviewerConstants;

        var isD3 = true;
        var isTable = false;
        var isJSON = false;
        var isScheme = false;

        var menus = [
            {
                id: 'file',
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
                id: 'view',
                title: '<i class="fa fa-eye"></i> View <span class="caret">',
                items: [
                    {
                        type: 'header',
                        content: 'Views'
                    },
                    {
                        id: 'd3',
                        type: 'checkbox',
                        content: 'D3',
                        model: isD3
                    },
                    {
                        id: 'table',
                        type: 'checkbox',
                        content: 'Table',
                        model: isTable
                    },
                    {
                        id: 'json',
                        type: 'checkbox',
                        content: 'JSON',
                        model: isJSON
                    },
                    {
                        id: 'scheme',
                        type: 'checkbox',
                        content: 'Scheme',
                        model: isScheme
                    }
                ]

            }            
        ];

        menuhelper.configureMenus(moduleConstants.name, menus);
    }

})();