(function() {
    'use strict';

    angular.module('app.header')
            .directive('headerSection', headerDirective);

    function headerDirective() {
        return {
            bindToController: true,
            controller: 'HeaderController',
            controllerAs : 'headerCtrl',
            restrict: 'E',
            replace: 'true',
            scope: {},
            templateUrl : '../app/scripts/header/views/header.html'
        }
    }
})();