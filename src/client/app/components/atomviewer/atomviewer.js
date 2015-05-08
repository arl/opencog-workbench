(function() {
    'use strict';

    angular
        .module('components.atomviewer')
        .controller('Atomviewer', Atomviewer);

    /* @ngInject  */
    function Atomviewer($scope, atomviewerConstants, menuhelper) {

        /*jshint validthis: true */
        var vm = this;

        var views = ['D3', 'Sigma', 'Table', 'JSON', 'Scheme'];

        // exports into view
        vm.title = atomviewerConstants.name;
        vm.infos = ['nothing for now..., click on a menu for example'];
        vm.showImport = false;
        vm.showExport = false;

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
            menuhelper.setMenuHandler('/atomviewer/view/left-sidebar', function(val) {
                vm.infos.push('Left Sidebar is :' + (val ? 'shown' : 'hidden'));
            });
            menuhelper.setMenuHandler('/atomviewer/view/right-sidebar', function(val) {
                vm.infos.push('Right Sidebar is :' + (val ? 'shown' : 'hidden'));
            });
            menuhelper.setMenuHandler('/atomviewer/view/atomdetails', function(val) {
                vm.infos.push('Atom Details modal window is :' + (val ? 'shown' : 'hidden'));
            });          
            menuhelper.setMenuHandler('/atomviewer/view/toolbox', function(val) {
                vm.infos.push('Toolbox modal window is :' + (val ? 'shown' : 'hidden'));
            });          
            menuhelper.setMenuHandler('/atomviewer/view/terminal', function(val) {
                vm.infos.push('Terminal modal window is :' + (val ? 'shown' : 'hidden'));
            });          

            // unregister menu handlers
            $scope.$on('$destroy', function() {

                // delete menu item handlers one by one
                menuhelper.resetMenuHandler('/atomviewer/filemenu/import');

                // or all menu handlers in a dropdown
                menuhelper.resetMenuHandler('/atomviewer/filemenu/*');

                // or all menu handlers in a component
                menuhelper.resetMenuHandler('/atomviewer/*');
            });
        }
    }
})();
