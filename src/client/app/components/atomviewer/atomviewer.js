(function() {
    'use strict';

    angular
        .module('components.atomviewer')
        .controller('Atomviewer', Atomviewer);

    /* @ngInject  */
    function Atomviewer(atomviewerConstants, AtomViewerMenus) {

        /*jshint validthis: true */
        var vm = this;

        vm.title = atomviewerConstants.name;

        // define menu click handler
        AtomViewerMenus.onDbgClick(function() {

            console.log('Atomview/Dbg Clicked');
            var radioval = AtomViewerMenus.getViewRadioValue();
            console.log('radio array val:' + radioval);
        });

        activate();

        function activate() {
        }
    }
})();
