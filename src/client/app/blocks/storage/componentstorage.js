(function() {
    'use strict';

    angular
        .module('blocks.storage')
        .provider('componentStorage', componentStorage);

    function componentStorage() {

        var component;

        return {
            // component name is set at the module level in componentStorageProvider
            // so that when one component needs local storage,
            // injecting 'componentStorage' will provide it with the storage specific
            // to its component
            setComponent: function(compname) {
                component = compname;
            },
            // see http://stackoverflow.com/questions/19171207/injecting-dependencies-into-provider
            // and https://docs.angularjs.org/guide/providers because $localStorage is injected
            // here, and this syntax is not minification friendly, but problably  
            // ngInject will take care of this... TO CHECK
            $get: function($localStorage) {

                // check if workbench storage exists (CHECK IF NECESSARY)
                // CHECK how to organize session storage naming to eveitate
                // name clashes, etc... at tab-level, session-level, etc...
                if (angular.isUndefined($localStorage.workbench))
                    $localStorage.workbench = {};
                if (angular.isUndefined($localStorage.workbench[component]))
                    $localStorage.workbench[component] = {};
                return $localStorage.workbench[component];
            }
        };
    }

})();