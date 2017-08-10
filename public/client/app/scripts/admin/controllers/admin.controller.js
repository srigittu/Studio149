( function() {
    'use strict';
    
    angular
        .module('app.admin')
        .controller('AdminController', AdminController);


    /**
     * @ngdoc AdminController
     * @name AdminController
     * @module app.admin
     * @description
     * Admin controller contains all the models related to admin module
     * @author Tungstn Developers
     */
    function AdminController($scope, AdminService) {
        var vm = this;
    }

    /**
     * @ngdoc Injector
     * @name AdminController
     * @module app.admin
     * @description
     * All the dependency injections for admin module
     * @author Tungstn Developers
     */
    AdminController.$inject = ['$scope', 'AdminService'];
} )();
