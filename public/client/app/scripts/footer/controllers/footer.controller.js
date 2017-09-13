( function() {
    'use strict';
    
    angular
        .module('app.footer')
        .controller('FooterController', FooterController);


    /**
     * @ngdoc FooterController
     * @name FooterController
     * @module app.home
     * @description
     * Home controller contains all the models related to home module
     * @author Tungstn Developers
     */
    function FooterController($scope) {
        var vm = this;
        
    }

    /**
     * @ngdoc Injector
     * @name FooterController
     * @module app.home
     * @description
     * All the dependency injections for home module
     * @author Tungstn Developers
     */
    FooterController.$inject = ['$scope'];
})();
