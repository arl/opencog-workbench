(function() {
    'use strict';

    angular
        .module('app.avengers')
        .run(appRun);

    // appRun.$inject = ['stateHelper']

    /* @ngInject */
    function appRun(stateHelper) {
        stateHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'avengers',
                config: {
                    templateUrl: 'app/avengers/avengers.html',
                    controller: 'Avengers as vm',
                    url: '/avengers',
                    data: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Avengers'
                    },
                    title: 'Avenger Component'
                }
            }
        ];
    }

})();
