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
                state: 'tab.avengers',
                config: {
                    url: 'avengers',
                    views: {
                        'avengers@tab': {
                            templateUrl: 'app/avengers/avengers.html',
                            controller: 'Avengers as vm'
                        }
                    },
                    data: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Avengers'
                    },
                    resolve: {
                        foo: function() {
                            console.log('resolving "foo" for tab.avengers...');
                            return 'foo';
                        }
                    },
                    title: 'Avenger Component',
                    deepStateRedirect: true,
                    sticky: true
                }
            }
        ];
    }

})();