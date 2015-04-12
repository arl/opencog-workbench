(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngSanitize',
        /*
         * Angular UI modules
         */
        
        'ui.router', 'ui.bootstrap',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.router',
        /*
         * 3rd Party modules
         */
        'ngplus', 'underscore', 'ct.ui.router.extras.sticky'
    ]);
})();
