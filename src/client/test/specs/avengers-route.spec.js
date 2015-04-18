/* jshint -W117, -W030 */
describe('avengers', function () {
    describe('route', function () {
        var controller;

        beforeEach(function() {
            module('app', specHelper.fakeLogger);
            specHelper.injector(function($location, $rootScope, $state, $templateCache) {});
            $templateCache.put('app/avengers/avengers.html', '');
        });

        it('should map /avengers route to avengers View template', function () {

            var avengersState = _.find($state.get(), function(s){ return s.url === 'avengers';});

            expect(avengersState.templateUrl).
                to.equal('app/avengers/avengers.html');
        });

        it('should route / to the avengers View', function () {
            $location.path('/avengers');
            $rootScope.$apply();
            expect($state.current.templateUrl).to.equal('app/avengers/avengers.html');
        });
    });
});

/*
beforeEach(function() {
		module('app', specHelper.fakeLogger);
		specHelper.injector(function($rootScope, $state, $templateCache) {});
		$templateCache.put('app/avengers/avengers.html', '');
});

it('should map avengers state to avengers View template', function () {

		var avengersState = _.find($state.get(), function(s){ return s.name == 'avengers';});
		expect(avengersState.templateUrl).
				to.equal('app/avengers/avengers.html');
});

it('should load avengers View when going to state avengers', function () {

		$state.go('avengers');
		$rootScope.$digest();
		expect($state.current.templateUrl).to.equal('app/avengers/avengers.html');
});
*/
