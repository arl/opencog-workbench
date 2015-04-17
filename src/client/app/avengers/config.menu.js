(function() {
    'use strict';

    angular
        .module('app.avengers')
        .run(appRun);

    /* @ngInject */
    function appRun(menuhelper, avengersConstants) {
        menuhelper.configureMenus(avengersConstants.name, getMenus());
    }

    function getMenus() {
        return [
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
    }
})();

/*

                <li dropdown>
                    <a dropdown-toggle role="button">Modules <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li class="nlightblue fade-selection-animation" data-ng-class="tnVm.isCurrent(r)"
                            data-ng-repeat="r in tnVm.navRoutes">
                            <a href="#{{r.originalPath}}" data-ng-bind-html="r.settings.content"></a>
                        </li>
                    </ul>
                </li>


 */
