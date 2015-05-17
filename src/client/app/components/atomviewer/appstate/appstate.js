(function() {
    'use strict';

    angular
        .module('components.atomviewer.appstate')
        .factory('appState', appState);

    /* @ngInject */
    function appState(_) {

        // array of string representing components
        var registry = [];
        registry['atomviewer'] = [];
       

        // TODO : this is the default value, but this has to be saved somewhere
        var showLeftSidebar = true;

        var service = {
            showScreen : showScreen,
            // test
            // showLeftSidebar : showLeftSidebar,
            setLeftSideBarVisible: function(visible) { showLeftSidebar = visible; },
            getLeftSideBarVisible: function() { return showLeftSidebar; },
            hideScreen : hideScreen,


            // restarting from here
            // AND MAYBE RENAME appstate in appSettings (file and service)
            configureComponentState : configureComponentState

        };

        return service;
        ///////////////

        
        function configureComponentState(component, states) {
            
        }

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
