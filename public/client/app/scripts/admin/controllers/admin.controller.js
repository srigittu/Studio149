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
    function AdminController($scope, $state, toastr, AdminService) {
        var vm = this;
        vm.product = {};
        vm.product.sizes = [];
        vm.images = [];

        $('#images').change(function() {
            vm.getLogo(this);
        });

        vm.getLogo = function(images) {
          angular.forEach(images.files, function(file, size) {
            vm.images.push(file);
          });
        };
        
        vm.addProduct = function(form) {
          vm.product.sizes = [];
          angular.forEach(vm.product.selectedSizes, function(value, size) {
            vm.product.sizes.push(size);
          });
          var formData = new FormData();
          angular.forEach(vm.product, function(value, key) {
              formData.append(key, value);
          });
          angular.forEach(vm.images, function(value, key) {
              formData.append('images[]', value);
          });
          vm.images = [];
          var promise = AdminService.addProduct(formData)
          promise.then(function(response) {
              if(response) {
                  form.$setPristine();
                  $state.go($state.current, {}, {reload: true});
                  toastr.success('Product Added Successfully!! code:'+response.data.product.code);
                  console.log('Product Added Successfully!! code', response.data.product.code);
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
    AdminController.$inject = ['$scope', '$state', 'toastr', 'AdminService'];
} )();
