( function() {
    'use strict';
    
    angular
        .module('app.product')
        .controller('ProductController', ProductController);


    /**
     * @ngdoc ProductController
     * @name ProductController
     * @module app.product
     * @description
     * Home controller contains all the models related to product module
     * @author Tungstn Developers
     */
    function ProductController($scope, ProductService, $stateParams, $state, toastr) {
        var vm = this;
        var categoryType = '';
        vm.user = {};
        vm.init = function() {
            categoryType = $stateParams.categoryName;
            var promise = ProductService.getProductsByCategoryType(categoryType);
            // vm.products = promise; // remove this line when backend api is ready.
            promise.then(function(response) {
                if(response.data) {
                  vm.products = response.data;
                } else {
                  console.log('Sorry could not get products');
                }
            });
        }

        vm.getProductDetail = function(productId) {
            // productId = $stateParams.id;
            $state.go('product-detail', {"id" : productId})
            var promise = ProductService.getProductDetailById(productId);
            // vm.product = promise; // remove this line when backend api is ready.
            

            // The below code will work once the api is ready
            promise.then(function(response) {
                if(response.data) {
                    vm.product = response.data;
                } else {
                    console.log('Sorry could not get product details');
                }
            });
        }

        vm.submitUserPaymentDetails = function() {
          if(vm.user == null) {
            toastr.error('Enter your details to make payment');
          } else {
            vm.user.productinfo = 'Lehenga'; //vm.product.product_name;
            vm.user.amount = 12300; //vm.product.price;
            var promise = ProductService.submitUserPaymentDetails(vm.user);
          }
          
        }
    }

    /**
     * @ngdoc Injector
     * @name ProductController
     * @module app.product
     * @description
     * All the dependency injections for product module
     * @author Tungstn Developers
     */
    ProductController.$inject = ['$scope', 'ProductService', '$stateParams', '$state', 'toastr'];
} )();
