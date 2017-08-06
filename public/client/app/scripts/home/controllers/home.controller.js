( function() {
    'use strict';
    
    angular
        .module('app.home')
        .controller('HomeController', HomeController);


    /**
     * @ngdoc HomeController
     * @name HomeController
     * @module app.home
     * @description
     * Home controller contains all the models related to home module
     * @author Tungstn Developers
     */
    function HomeController($scope, HomeService) {
        var vm = this;
        console.log('gud after');
    }

    /**
     * @ngdoc Injector
     * @name HomeController
     * @module app.home
     * @description
     * All the dependency injections for home module
     * @author Tungstn Developers
     */
    HomeController.$inject = ['$scope', 'HomeService'];
} )();
