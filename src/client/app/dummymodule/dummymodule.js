(function() {
    'use strict';

    angular
        .module('app.dummymodule')
        .controller('Dummymodule', Dummymodule);

    /* @ngInject  */
    function Dummymodule($scope, $rootScope, $q, dataservice, logger, dummymoduleConstants, menuhelper, dummymenus) {

        /*jshint validthis: true */
        var vm = this;

        vm.dummydata = {
            title: 'A Great module',
            description: 'a great empty module'
        };
        vm.title = dummymoduleConstants.name;

        dummymenus.onCallDummy(function() {

            console.log('dummymenus.onClickDummy');
            var called = true;
        });


        var menuListener = $rootScope.$on('clickMenu', function (event, menuid) {
        if (menuid === dummymoduleConstants.id + 'item1.1') {
            alert('dummymodule: onClickMe, title : ' + vm.title);
        }
/*
        il faut deporter vers menuhelper tout le code generique, qui serait répeté
        a chaque controller principal des modules.
        Mais, sachant des des controllers differents d'un meme module peuvent consomer un
        menu, il faut trouver un moyen de passer le controler avec le menu dont on souhaite etre notifie
        de plusil ya le probleme des menus 'checkboxes', peut etre passer a une certaine fonction de 
        menuhelper la variable a updater automatiquement en cas de changement de valeur de la checkbox

        // something like that 
        menuhelper.registerHandler(moduleConstant.id, 'item1.1', )

        menuhelper.onItem1( function () {
            
        });

        on.destroy(menuhelper.unregisterHandlers())
*/
        });

        $scope.$on('$destroy', function() {
            var coucou = true;
            menuListener();
        });

        activate();

        function activate() {
            logger.info('Activated Dummymodule View');
        }
    }
})();
