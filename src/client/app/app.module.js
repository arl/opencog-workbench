(function() {
    'use strict';


/**
 * @ngdoc function
 * @name app.myFunc
 * @description
 * This is a sample function
 * @param {number} x - any number, don't matter which
 */
var myFunc = function(x){
  return 2*x;
};

    angular.module('app', [
        /*
         * Order is not important. Angular makes a
         * pass to register all of the modules listed
         * and then when app.components tries to use app.data,
         * it's components are available.
         */

        /*
         * Everybody has access to these.
         * We could place these under every feature area,
         * but this is easier to maintain.
         */ 
        'app.core',
        'app.layout',

        /*
         * OpenCog Workbench components
         */
        'app.components'
    ]);

})();
