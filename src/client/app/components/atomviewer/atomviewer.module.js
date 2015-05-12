(function() {
    'use strict';

    angular
        .module('components.atomviewer', [
            'components.atomviewer.leftsidebar',
            'components.atomviewer.importexport',
			'components.atomviewer.help'
        ])
        .constant('atomviewerConstants', {
            'name': 'Atomspace Viewer',
            'id': 'atomviewer',
            'faIcon': 'fa-plus-circle'            
        });

})();
