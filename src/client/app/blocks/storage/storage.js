(function() {
    'use strict';

    angular
        .module('blocks.storage')
        .factory('storage', storage);

    function storage($localStorage) {

        var componentsStorage = null;
        if (angular.isUndefined($localStorage.components)) {
            $localStorage.components = {};
        }
        componentsStorage = $localStorage.components;

        return {
            // create a component-specific storage
            createComponentStorage: function(compid) {
                if (angular.isUndefined(componentsStorage[compid])) {
                    componentsStorage[compid] = {};
                }
                return componentsStorage[compid];
            }
        };
    }

})();