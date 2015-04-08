(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    // appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                state: 'dashboard',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    controller: 'Dashboard as vm',
                    url: '/',
                    data: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    },
                    title: 'Dashboard Component'                    
                }
            }
        ];
    }
})();
