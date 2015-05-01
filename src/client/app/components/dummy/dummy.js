(function() {
    'use strict';

    angular
        .module('components.dummy')
        .controller('Dummy', Dummy);

    /* @ngInject  */
    function Dummy(logger, dummyConstants, DummyMenus) {

        /*jshint validthis: true */
        var vm = this;

        vm.dummydata = {
            title: 'A Great module',
            description: 'a great empty module'
        };
        vm.title = dummyConstants.name;

        // define menu click handler
        DummyMenus.onClickDummy(function() {

            console.log('Dummy Clicked');
            var chkval = DummyMenus.getDummyChkValue();
            console.log('chkval:' + chkval);
        });   

        activate();

        function activate() {
            logger.info('Activated Dummy View');
        }
    }
})();
