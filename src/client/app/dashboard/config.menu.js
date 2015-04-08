(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    // appRun.$inject = ['routehelper']

    /* @ngInject */
    function appRun(menuhelper) {
        // first parameter is the workbench component name
        menuhelper.configureMenus('dashboard', getMenus());
    }

    function getMenus() {
        return [
            {
                title: 'dashboard menu',
                items: [
                    {
                        content: 'subitem1.1',
                        url: ''                    
                    },
                    {
                        content: 'subitem1.2',
                        url: ''                    
                    },
                    {
                        content: 'subitem1.3',
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
