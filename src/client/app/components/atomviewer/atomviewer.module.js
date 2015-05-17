(function() {
    'use strict';

    angular
        .module('components.atomviewer', [
            'components.atomviewer.appstate',
            'components.atomviewer.leftsidebar',
            'components.atomviewer.importexport',
            'components.atomviewer.help',
            'components.atomviewer.terminal'
        ])
        // remove atomViewerConstants if we can declare a moduleConstants at component-level
        // hidden from other moduleConstants in other components (also why not rename it to 
        // componentConstants to better separate of angular module and workbench component)
        .constant('atomviewerConstants', {
            'name': 'Atomspace Viewer',
            'id': 'atomviewer',
            'faIcon': 'fa-plus-circle'            
        })
        .constant('moduleConstants', {
            'name': 'Atomspace Viewer',
            'id': 'atomviewer',
            'faIcon': 'fa-plus-circle'            
        })        
        .config(moduleConfig);

        /* @ngInject */
        function moduleConfig(componentStorageProvider, moduleConstants) {
            componentStorageProvider.setComponent(moduleConstants.name);
        };

})();
