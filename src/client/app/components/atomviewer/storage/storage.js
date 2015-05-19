(function() {
    'use strict';

    angular
        .module('components.atomviewer.storage')
        .factory('atomviewerStorage', atomviewerStorage);

    /* @ngInject */
    function atomviewerStorage(atomviewerConstants, storage) {

        var moduleConstants = atomviewerConstants;
        var compstorage = null;

        initialize();

        return {
            getValue : getValue,
            setValue : setValue
        };

        /////////////

        function getValue(name) {
            return compstorage[name];
        }

        function setValue(name, val) {
            compstorage[name] = val;
        }

        /////////////
        // private

        function initialize() {
            compstorage = storage.createComponentStorage(moduleConstants.id);

            var defaults = {
                'showLeftSidebar': true,
                'showRightSidebar': true
            };

            setDefaultValues(defaults);
        }

        function setDefaultValues(defaults) {
            // create/set default value for every stored component setting

            angular.forEach(defaults, function (v, k) {
                if (compstorage[k] === undefined)
                    compstorage[k] = v;
            });
        }
    }   

})();
