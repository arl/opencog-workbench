(function() {
    'use strict';

    angular
        .module('components.atomviewer', [
			'components.atomviewer.importexport'        	
        ])
        .constant('atomviewerConstants', {
            'name': 'Atomspace Viewer',
            'id': 'atomviewer',
            'faIcon': 'fa-plus-circle'            
        });

})();
