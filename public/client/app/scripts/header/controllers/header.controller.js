( function() {
    'use strict';
    
    angular
        .module('app.header')
        .controller('HeaderController', HeaderController);


    /**
     * @ngdoc HomeController
     * @name HomeController
     * @module app.home
     * @description
     * Home controller contains all the models related to home module
     * @author Tungstn Developers
     */
    function HeaderController($scope) {
        var vm = this;
        console.log('ccccccc---header')
    }

    /**
     * @ngdoc Injector
     * @name HomeController
     * @module app.home
     * @description
     * All the dependency injections for home module
     * @author Tungstn Developers
     */
    HeaderController.$inject = ['$scope'];
} )();
