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
    function ProductController($scope, ProductService, OrderService, $stateParams, $state, toastr) {
        var vm = this;
        var categoryType = '';
        vm.user = {};
        vm.init = function() {
            categoryType = $stateParams.categoryName;
            
            if (categoryType == 'pret') {
                categoryType = 1;
            } else if (categoryType == 'fusion') {
                categoryType = 2;
            } else if (categoryType == 'bridal') {
                categoryType = 3;
            }
            console.log('category-------', categoryType);
            var promise = ProductService.getProductsByCategoryType(categoryType);
            promise.then(function(response) {
                if(response.data) {
                 console.log('response-------', response)
                  vm.products = response.data.products;
                 angular.forEach(vm.products, function(product) {
                     var productImages = product.product_detail.image.split(',');
                     product.productImages = productImages;
                 });
                } else {
                  console.log('Sorry could not get products');
                }
            });
        }

        vm.getProductDetail = function(productId) {
            // productId = $stateParams.id;
            $state.go('product-detail', {"id" : productId})
            var promise = ProductService.getProductDetailById(productId);
            vm.product = promise; // remove this line when backend api is ready.
            promise.then(function(response) {
                if(response.data) {
                    vm.product = response.data;
                } else {
                    console.log('Sorry could not get product details');
                }
            });
        }

        vm.sendEnquiryDetails =function(userInfo) {
            var promise = OrderService.sendEnquiryDetails(userInfo);
            promise.then(function(response) {
                if(response) {
                    console.log('success------');
                } else {
                    console.log('failure------');
                }
            });
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
    ProductController.$inject = ['$scope', 'ProductService', 'OrderService', '$stateParams', '$state', 'toastr'];
} )();
