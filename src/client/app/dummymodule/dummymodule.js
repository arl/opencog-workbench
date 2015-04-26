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
        });

        // define checkbox change handler
        dummymenus.onChangeDummyChk(function(newval) {

            console.log('Dummy Check : ' + newval);
        });        

        activate();

        function activate() {
            logger.info('Activated Dummymodule View');
        }
    }
})();
