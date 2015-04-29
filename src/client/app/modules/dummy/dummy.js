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
/*

        CONTINUE WITH issue8 :
            - create a 'module' folder under 'app' folder
            - place the 4 modules under it
            - add also a modules.js file in which we load all the oc workbench modules
            - in app.module.js don't call every module indepedently but call only module.js
            - module angular names will be called like the newly called
                    modules.dummy (ex modules.dashboard instead of app.dashboard)
            - maybe we could generate the list of list of ui-view at the end of tabs.html,
                    instead of having it hard-coded (maybe by a directive using compile (one time compilation), 
                    or maybe only by returning a one template formed of all the oc workbench modules under
                    'modules' folder)
*/
        function activate() {
            logger.info('Activated Dummy View');
        }
    }
})();
