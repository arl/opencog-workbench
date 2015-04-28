(function() {
    'use strict';

    angular
        .module('app.dummymodule')
        .controller('Dummymodule', Dummymodule);

    /* @ngInject  */
    function Dummymodule(logger, dummymoduleConstants, dummymenus) {

        /*jshint validthis: true */
        var vm = this;

        vm.dummydata = {
            title: 'A Great module',
            description: 'a great empty module'
        };
        vm.title = dummymoduleConstants.name;

        // define menu click handler
        dummymenus.onClickDummy(function() {

            console.log('Dummy Clicked');
            var chkval = dummymenus.getDummyChkValue();
            console.log('chkval:' + chkval);
        });   

        activate();

        function activate() {
            logger.info('Activated Dummymodule View');
        }
    }
})();
