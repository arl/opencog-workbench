(function() {
    'use strict';

    angular
        .module('app.atomviewer')
        .controller('Atomviewer', Atomviewer);

    /* @ngInject  */
    function Atomviewer($q, dataservice, logger, atomviewerConstants) {

        /*jshint validthis: true */
        var vm = this;

        vm.news = {
            title: 'Marvel Avengers',
            description: 'Marvel Avengers 2 is now in production!'
        };
        vm.avengerCount = 0;
        vm.avengers = [];
        vm.title = atomviewerConstants.name;

        activate();

        function activate() {
            var promises = [getAvengerCount(), getAvengersCast()];
            // Using a resolver on all routes or dataservice.ready in every controller
            // return dataservice.ready(promises).then(function(){
            return $q.all(promises).then(function() {
                logger.info('Activated Atomspace Viewer');
            });
        }

        function getAvengerCount() {
            return dataservice.getAvengerCount().then(function(data) {
                vm.avengerCount = data;
                return vm.avengerCount;
            });
        }

        function getAvengersCast() {
            return dataservice.getAvengersCast().then(function(data) {
                vm.avengers = data;
                return vm.avengers;
            });
        }
    }
})();
