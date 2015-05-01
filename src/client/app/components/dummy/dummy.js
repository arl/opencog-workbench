(function() {
    'use strict';

    angular
        .module('components.dummy')
        .controller('Dummy', Dummy);

    /* @ngInject  */
    function Dummy($scope, logger, dummyConstants, DummyMenus, menuhelper) {

        /*jshint validthis: true */
        var vm = this;

        vm.dummydata = {
            title: 'A Great module',
            description: 'a great empty module'
        };
        vm.title = dummyConstants.name;

        // define menu click handler
        menuhelper.setClickHandler('/dummy/examplemenu/simpleitem', function() {

            console.log('Dummy Clicked');
            // var chkval = DummyMenus.getDummyChkValue();
            // console.log('chkval:' + chkval);
        });

        $scope.$on('$destroy', function() {
            menuhelper.resetClickHandler('/dummy/examplemenu/simpleitem');
        });

        activate();

        function activate() {
            logger.info('Activated Dummy View');
        }
    }
})();
