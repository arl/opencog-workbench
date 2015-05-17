(function() {
    'use strict';

    angular
        .module('components.dummy', [])
        .constant('dummyConstants', {
            'name': 'Dummy',
            'id': 'dummy',
            'faIcon': 'fa-wrench'            
        })
        .constant('moduleConstants', {
            'name': 'Dummy',
            'id': 'dummy',
            'faIcon': 'fa-wrench'            
        })
        .config(moduleConfig);

        /* @ngInject */
        function moduleConfig(componentStorageProvider, moduleConstants) {
            componentStorageProvider.setComponent(moduleConstants.name);
        };

})();
