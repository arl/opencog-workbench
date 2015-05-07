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

        activate();

        //////////////
        
        function activate() {

            /* install menu handlers */
            // file menu
            menuhelper.setMenuHandler('/atomviewer/filemenu/import', function() {
                vm.infos.push('Clicked on Import');
            });
            menuhelper.setMenuHandler('/atomviewer/filemenu/export', function() {
                vm.infos.push('Clicked on Export');
            });

            // view menu
            menuhelper.setMenuHandler('/atomviewer/viewmenu/viewradio', function(val) {
                vm.infos.push('Main view changed to :' + views[val]);
            });
            menuhelper.setMenuHandler('/atomviewer/viewmenu/left-sidebar', function(val) {
                vm.infos.push('Left Sidebar is :' + (val?'shown':'hidden'));
            });
            menuhelper.setMenuHandler('/atomviewer/viewmenu/right-sidebar', function(val) {
                vm.infos.push('Right Sidebar is :' + (val?'shown':'hidden'));
            });
            menuhelper.setMenuHandler('/atomviewer/viewmenu/atomdetails', function(val) {
                vm.infos.push('Atom Details modal window is :' + (val?'shown':'hidden'));
            });          
            menuhelper.setMenuHandler('/atomviewer/viewmenu/toolbox', function(val) {
                vm.infos.push('Toolbox modal window is :' + (val?'shown':'hidden'));
            });          
            menuhelper.setMenuHandler('/atomviewer/viewmenu/terminal', function(val) {
                vm.infos.push('Terminal modal window is :' + (val?'shown':'hidden'));
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
