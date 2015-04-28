(function() {
    'use strict';

    angular
        .module('modules.dummy', [])
        .constant('dummyConstants', {
            'name': 'Dummy',
            'id': 'dummy',
            'faIcon': 'fa-wrench'            
        });

})();
