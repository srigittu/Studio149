(function() {
    'use strict';

    angular.module('app.header')
            .directive('footerSection', footerDirective);

    function footerDirective() {
        return {
            bindToController: true,
            controller: 'FooterController',
            controllerAs : 'footerCtrl',
            restrict: 'E',
            replace: 'true',
            scope: {},
            templateUrl : '../app/scripts/footer/views/footer.html'
        }
    }
})();