(function() {
    'use strict';

    angular
        .module('components.atomviewer.appstate', [])
        .factory('appState', appState);

    /* @ngInject */
    function appState(_) {

        var allMenus = [];

        var service = {
            showScreen : showScreen,
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
