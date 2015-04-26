(function() {
    'use strict';

    angular
        .module('app.avengers')
        .run(appRun);

    /* @ngInject */
    function appRun(menuhelper, avengersConstants) {
        var moduleConstants = avengersConstants;
        var menus = [
            {
                title: 'avengers menu1',
                items: [
                    {
                        content: 'subitem1.1',
                        url: ''                    
                    },
                    {
                        content: 'subitem1.2',
                        url: ''                    
                    }
                ]

            },
            {
                title: 'avengers menu2',
                items: [
                    {
                        content: 'subitem2.1',
                        url: ''                    
                    },
                    {
                        content: 'subitem2.2',
                        url: ''                    
                    },
                    {
                        content: 'subitem2.3',
                        url: ''                    
                    }                
                ]
            }            
        ];
        menuhelper.configureMenus(moduleConstants.name, menus);
    }

})();
