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
        vm.product = {};
        vm.sizes = [];
        
        vm.addProduct = function() {
          $("input:checkbox[name=type]:checked").each(function(){
            vm.sizes.push($(this).val());
          });
          vm.product.sizes = vm.sizes;
          var promise = AdminService.addProduct(vm.product)
          promise.then(function(response) {
              if(response) {
                  console.log('added product successfully');
              } else {
                  console.log('Fuck off');
              }
          });
        }
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
