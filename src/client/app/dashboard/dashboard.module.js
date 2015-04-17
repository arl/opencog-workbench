(function() {
    'use strict';

    angular
        .module('app.dashboard', [])
        .constant("dashboardConstants", {
            "name": "Dashboard",
            "id": "dashboard",
            'faIcon': 'fa-dashboard'            
        });

})();
