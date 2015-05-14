(function() {
    'use strict';

    angular
        .module('components.atomviewer')
        .run(appRun);

    /* @ngInject */
    function appRun(menuhelper, atomviewerConstants, appState) {
        var moduleConstants = atomviewerConstants;

        // define our component menus
        var menus = [
            // file menu
            {
                id: 'file',
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
            // view menu
            {
                id: 'view',
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
                    { // https://gist.github.com/CMCDragonkai/6282750
                        //http://codepen.io/panty/pen/PqNRrB?editors=101
                        //http://jsfiddle.net/terebentina/9mFpp/
                        id: 'left-sidebar',
                        type: 'checkbox',
                        content: 'Left Sidebar',
                        model: appState.showLeftSidebar PEUT ETRE METTRE ICI 'appState.showLeftSidebar' et parser en suite,
                        dans ce cas les modifs faites dans menuitems ne sont pas nécessaires, bien qu'elles ne dérangent pas!
													voir http://stackoverflow.com/questions/14050195/what-is-the-difference-between-and-in-directive-scope

JE PENSE QUE TOUT LE SYSTEME DE MENU DEVRAIT ETRE REMPLACE PAR $scope.$watch()

FAIRE UN PROTO DANS UNE BRANCHE

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
            },
            // analyze menu
            {
                id: 'analyze',
                title: '<i class="fa fa-book"></i> Analyze <span class="caret">',
                items: [
                    {
                        id: 'statistics',
                        type: 'simple',
                        content: '<i class="fa fa-question"></i> Statistics'
                    }
                ]
            },
            // help menu
            {
                id: 'help',
                title: '<i class="fa fa-book"></i> Help <span class="caret">',
                items: [
                    {
                        id: 'howtouse',
                        type: 'simple',
                        content: '<i class="fa fa-question"></i> How to Use'
                    },
                    {
                        id: 'about',
                        type: 'simple',
                        content: '<i class="fa fa-info"></i> About'
                    }
                ]
            }
        ];

        // declare them to the menuhelper
        menuhelper.configureMenus(moduleConstants.id, menus);
    }

})();
