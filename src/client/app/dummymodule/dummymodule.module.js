(function() {
    'use strict';

    angular
        .module('app.dummymodule', [])
        .constant('dummymoduleConstants', {
            'name': 'Dummymodule',
            'id': 'dummymodule',
            'faIcon': 'fa-wrench'            
        });

})();
