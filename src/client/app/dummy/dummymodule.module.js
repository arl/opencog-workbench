(function() {
    'use strict';

    angular
        .module('modules.dummy', [])
        .constant('dummyConstants', {
            'name': 'Dummymodule',
            'id': 'dummy',
            'faIcon': 'fa-wrench'            
        });

})();
