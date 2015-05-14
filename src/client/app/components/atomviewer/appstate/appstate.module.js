(function() {
    'use strict';

    angular
        .module('components.atomviewer.appstate', [])
        .factory('appState', appState);

    /* @ngInject */
    function appState(_) {

        var allMenus = [];

        // TODO : this is the default value, but this has to be saved somewhere
        var showLeftSidebar = true;

        var service = {
            showScreen : showScreen,
            // test
            showLeftSidebar : showLeftSidebar,
            hideScreen : hideScreen
        };

        return service;
        ///////////////

        /**
         * show a specific window/screen
         * @param  {String} window/screen name
         */
        function showScreen(screen) {
        }

        /**
         * hide a specific window/screen
         * @param  {String} window/screen name
         */
        function hideScreen(screen) {
        }

        ///////////////
        // private
        
    }
})();
