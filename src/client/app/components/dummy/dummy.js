(function() {
    'use strict';

    angular
        .module('components.dummy')
        .controller('Dummy', Dummy);

    /* @ngInject  */
    function Dummy($scope, logger, dummyConstants, menuhelper) {

        /*jshint validthis: true */
        var vm = this;

        vm.dummydata = {
            title: 'A Great module',
            description: 'a great empty module'
        };
        vm.title = dummyConstants.name;

        // set selection handler for 'Dummy' menu item
        menuhelper.setMenuHandler('/dummy/examplemenu/simpleitem', function() {
            console.log('Dummy Clicked');
        });

        // set toggle handler for 'Dummy Check' checkbox menu item
        menuhelper.setMenuHandler('/dummy/examplemenu/checkboxitem', function(val) {
            console.log('dummy check value changed to :' + val);
        });

        // set handler for 'Radio' checkbox menu item
        menuhelper.setMenuHandler('/dummy/examplemenu/radioitem', function(val) {
            console.log('checked Radio value is now :' + val);
        });

        $scope.$on('$destroy', function() {
            menuhelper.resetMenuHandler('/dummy/examplemenu/simpleitem');
            menuhelper.resetMenuHandler('/dummy/examplemenu/checkboxitem');
            menuhelper.resetMenuHandler('/dummy/examplemenu/radioitem');
        });

        activate();

        function activate() {
            logger.info('Activated Dummy View');
        }
    }
})();
