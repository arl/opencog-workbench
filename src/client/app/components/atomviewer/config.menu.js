(function() {
    'use strict';

    angular
        .module('components.atomviewer')
        .run(appRun);

    /* @ngInject */
    function appRun(menuhelper, atomviewerConstants) {
        var moduleConstants = atomviewerConstants;

        // define our component menus
        var menus = [
            {
                id: 'filemenu',
                title: '<i class="fa fa-file"></i> File <span class="caret">',
                items: [
                    {
                        id: 'import',
                        type: 'simple',
                        content: '<i class="fa fa-exchange"></i> Import'
                    },
                    {
                        id: 'export',
                        type: 'simple',
                        content: '<i class="fa fa-exchange"></i> Export'
                    }
                ]

            },
            {
                id: 'viewmenu',
                title: '<i class="fa fa-eye"></i> View <span class="caret">',
                items: [
                    {
                        type: 'header',
                        content: 'Views'
                    },
                    {
                        id: 'viewradio',
                        type: 'radio',
                        content: [
                            'D3', 'Sigma', 'Table', 'JSON', 'Scheme'
                        ],
                        model: 0    // default selection : D3
                    },
                    {
                        type: 'header',
                        content: 'Sidebars'
                    },
                    {
                        id: 'left-sidebar',
                        type: 'checkbox',
                        content: 'Left Sidebar'
                    },
                    {
                        id: 'right-sidebar',
                        type: 'checkbox',
                        content: 'Right Sidebar'
                    },
                    {
                        type: 'header',
                        content: 'Windows'
                    },
                    {
                        id: 'atomdetails',
                        type: 'checkbox',
                        content: 'Atom Details'
                    },
                    {
                        id: 'toolbox',
                        type: 'checkbox',
                        content: 'Toolbox'
                    },
                    {
                        id: 'terminal',
                        type: 'checkbox',
                        content: 'Terminal'
                    }
                ]
            }            
        ];

        // declare them to the menuhelper
        menuhelper.configureMenus(moduleConstants.id, menus);
    }

})();