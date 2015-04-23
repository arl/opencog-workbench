(function() {
    'use strict';

    angular
        .module('app.dummymodule')
        .controller('Dummymodule', Dummymodule);

    /* @ngInject  */
    function Dummymodule($q, dataservice, logger, dummymoduleConstants) {

        /*jshint validthis: true */
        var vm = this;

        vm.dummydata = {
            title: 'A Great module',
            description: 'a great empty module'
        };
        vm.title = dummymoduleConstants.name;

        activate();

        function activate() {
            logger.info('Activated Dummymodule View');
        }
    }
})();
