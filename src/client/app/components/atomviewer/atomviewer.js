(function() {
    'use strict';

    angular
        .module('components.atomviewer')
        .controller('Atomviewer', Atomviewer);

    /* @ngInject  */
    function Atomviewer($scope, menuhelper, atomviewerConstants, atomviewerStorage) {

        /*jshint validthis: true */
        var vm = this;

        var views = ['D3', 'Sigma', 'Table', 'JSON', 'Scheme'];

        // exports into view
        vm.title = atomviewerConstants.name;
        vm.infos = ['nothing for now..., click on a menu for example'];

        // get the component storage
        vm.storage = atomviewerStorage;

        // array of deregistration functions returned by $watch
        var arrDeregister = [];
        var dereg = null;

        // bind menu items to stored values
        ///////////////////////////////////
        dereg = $scope.$watch(
            function() { return atomviewerStorage.getValue('showLeftSidebar'); },
            function(newval) { menuhelper.setMenuModel('/atomviewer/view/left-sidebar', newval); });
        arrDeregister.push(dereg);

        dereg = $scope.$watch(
            function() { return atomviewerStorage.getValue('showRightSidebar'); },
            function(newval) { menuhelper.setMenuModel('/atomviewer/view/right-sidebar', newval); });
        arrDeregister.push(dereg);

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
                atomviewerStorage.setValue('showLeftSidebar', newval);
            });
            menuhelper.setMenuHandler('/atomviewer/view/right-sidebar', function(newval) {
                atomviewerStorage.setValue('showRightSidebar', newval);
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

                // unregister from all $watch listeners
                angular.forEach(arrDeregister, function(fun) {
                    fun();
                });
            });
        }
    }
})();
