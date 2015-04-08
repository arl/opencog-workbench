(function () {

  //'use strict';

  function _() {

    return window._; // assumes underscore has already been loaded on the page
  }

  angular
  .module('underscore', []) 
  .factory('_', _); 

})();
