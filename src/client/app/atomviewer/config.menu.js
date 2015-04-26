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
                title: '<i class="fa fa-file"></i> File <span class="caret">',
                items: [
                    {
                        content: '<i class="fa fa-exchange"></i> Import',
                        url: ''                    
                    },
                    {
                        content: '<i class="fa fa-exchange"></i> Export',
                        url: ''                    
                    }
                ]

            },
            {
                title: '<i class="fa fa-eye"></i> View <span class="caret">',
                items: [
                    {
                        content: '<i class="fa fa-exchange"></i> Import',
                        url: ''                    
                    },
                    {
                        content: '<i class="fa fa-exchange"></i> Export',
                        url: ''                    
                    }
                ]

            }            
        ];

        menuhelper.configureMenus(moduleConstants.name, menus);
    }

})();