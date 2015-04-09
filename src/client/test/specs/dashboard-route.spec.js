/* jshint -W117, -W030 */
describe('dashboard', function () {
    describe('route', function () {
        var controller;

        beforeEach(function() {
            module('app', specHelper.fakeLogger);
            specHelper.injector(function($rootScope, $state, $templateCache, $location) {});
            $templateCache.put('app/dashboard/dashboard.html', '');
        });

        it('should map / route to dashboard View template', function () {

            var dashboardState = _.find($state.get(), function(s){ return s.url == '/';});

            expect(dashboardState.templateUrl).
                to.equal('app/dashboard/dashboard.html');
        });

        it('should route / to the dashboard View', function () {
            $location.path('/');
            $rootScope.$digest();
            expect($state.current.templateUrl).to.equal('app/dashboard/dashboard.html');
        });

        it('should route /invalid to the otherwise (dashboard) route', function () {
            $location.path('/invalid');
            $rootScope.$digest();
            expect($state.current.templateUrl).to.equal('app/dashboard/dashboard.html');
        });
    });
});