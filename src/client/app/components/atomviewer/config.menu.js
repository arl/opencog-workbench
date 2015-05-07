(function() {
    'use strict';

    angular
        .module('components.atomviewer')
        .factory('AtomViewerMenus', AtomViewerMenus)
        .run(appRun);

    /* @ngInject */
    function AtomViewerMenus(atomviewerConstants, _) {
        var moduleConstants = atomviewerConstants;

        // menu item handler
        var debugClickHandler = angular.noop;

        // view radio button model array
        var viewradioModel = [true, false, false, false];

        var menus = [
            // file menu
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
            // view menu
            {
                id: 'view',
                title: '<i class="fa fa-eye"></i> View <span class="caret">',
                items: [
                    {
                        type: 'header',
                        content: 'Views'
                    },

                    // simple menu item with handler
                    {   
                        id: 'simpleitem',
                        type: 'simple',
                        content: 'debug',
                        handler: function() {
                            debugClickHandler();
                        }
                    },

                    // new type : radio button
                    {
                        id: 'viewradio',
                        type: 'radio',
                        content: [
                            'D3', 'Table', 'JSON', 'Scheme'
                        ],
                        model: viewradioModel
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

        var service = {
            getModuleMenus: function() { return menus; },

            // set 'debug' handler
            onDbgClick: function(handler) {
                debugClickHandler = handler;
            },

            getViewRadioValue: function () {
                var menu = _.find(menus, function(menu) { return menu.id === 'viewmenu'; });
                var item = _.find(menu.items, function(item) { return item.id === 'viewradio'; });
                return item.model;
            }
        };

        return service;
        ///////////////

    }

    /* @ngInject */
    function appRun(menuhelper, atomviewerConstants, AtomViewerMenus) {
        var moduleConstants = atomviewerConstants;
        menuhelper.configureMenus(moduleConstants.id, AtomViewerMenus.getModuleMenus());
    }

})();