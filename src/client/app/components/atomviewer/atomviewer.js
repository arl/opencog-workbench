(function() {
    'use strict';

    angular
        .module('components.atomviewer')
        .controller('Atomviewer', Atomviewer);

    /* @ngInject  */
    function Atomviewer($scope, atomviewerConstants, menuhelper, appState) {

        /*jshint validthis: true */
        var vm = this;

        var views = ['D3', 'Sigma', 'Table', 'JSON', 'Scheme'];

        // exports into view
        vm.title = atomviewerConstants.name;
        vm.infos = ['nothing for now..., click on a menu for example'];

        // get the appstate service
        vm.appState = appState;

        /* 
        orignal val coming from appState
        copied into the menu declaration (subm.model)
        */

        // bind appState values to corresponding menu items
        $scope.$watch(vm.appState.getLeftSideBarVisible, function(newval) {
            menuhelper.setMenuModel('/atomviewer/view/left-sidebar', newval);
        });

        vm.showImport = false;
        vm.showExport = false;
        vm.showAbout = false;
        vm.showHelp = false;

        // side menus
        vm.showRightMenu = true;

        // draggable windows visible
        vm.showAtomDetails = false;
        vm.showToolbox = false;
        vm.showTerminal = false;

        activate();

        //////////////
        
        function activate() {

            /* install menu handlers */

            // file menu
            menuhelper.setMenuHandler('/atomviewer/file/import', function() {
                vm.showImport = !vm.showImport;
            });
            menuhelper.setMenuHandler('/atomviewer/file/export', function() {
                vm.showExport = !vm.showExport;
            });

            // view menu
            menuhelper.setMenuHandler('/atomviewer/view/viewradio', function(val) {
                vm.infos.push('Main view changed to :' + views[val]);
            });
            menuhelper.setMenuHandler('/atomviewer/view/left-sidebar', function(newval) {
                appState.setLeftSideBarVisible(newval);
            });
            menuhelper.setMenuHandler('/atomviewer/view/right-sidebar', function(newval) {
                vm.infos.push('Right Sidebar is :' + (newval ? 'shown' : 'hidden'));
                // menuhelper.setMenuModel('/atomviewer/view/left-sidebar', newval);
            });
            menuhelper.setMenuHandler('/atomviewer/view/atomdetails', function(val) {
                vm.showAtomDetails = !vm.showAtomDetails;
            });          
            menuhelper.setMenuHandler('/atomviewer/view/toolbox', function(val) {
                vm.showToolbox = !vm.showToolbox;
            });          
            menuhelper.setMenuHandler('/atomviewer/view/terminal', function(val) {
                vm.showTerminal = !vm.showTerminal;
            });          

            // help menu
            menuhelper.setMenuHandler('/atomviewer/help/howtouse', function() {
                vm.showHelp = !vm.showHelp;
            });
            menuhelper.setMenuHandler('/atomviewer/help/about', function() {
                vm.showAbout = !vm.showAbout;
            });
 
            // unregister menu handlers
            $scope.$on('$destroy', function() {

                // delete menu item handlers one by one
                // menuhelper.resetMenuHandler('/atomviewer/filemenu/import');

                // or all menu handlers in a dropdown
                // menuhelper.resetMenuHandler('/atomviewer/filemenu/*');

                // or all menu handlers in a component
                menuhelper.resetMenuHandler('/atomviewer/*');
            });
        }
    }
})();
