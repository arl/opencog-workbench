(function() {
    'use strict';

    angular
        .module('modules.dummy')
        .controller('Dummy', Dummy);

    /* @ngInject  */
    function Dummy(logger, dummyConstants, dummymenus) {

        /*jshint validthis: true */
        var vm = this;

        vm.dummydata = {
            title: 'A Great module',
            description: 'a great empty module'
        };
        vm.title = dummyConstants.name;

        // define menu click handler
        dummymenus.onClickDummy(function() {

            console.log('Dummy Clicked');
            var chkval = dummymenus.getDummyChkValue();
            console.log('chkval:' + chkval);
        });   

        activate();

        function activate() {
            logger.info('Activated Dummy View');
        }
    }
})();
