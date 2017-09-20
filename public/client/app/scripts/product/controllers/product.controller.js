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
            vm.categoryName = $stateParams.categoryName;
            
            if (vm.categoryName == 'pret') {
                categoryType = 1;
            } else if (vm.categoryName == 'festive') {
                categoryType = 2;
            } else if (vm.categoryName == 'bridal') {
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
                 console.log('After modification--------', vm.products)
                } else {
                  console.log('Sorry could not get products');
                }
            });
        }

        vm.getProductDetail = function(productId) {
            // productId = $stateParams.id;
            $state.go('product-detail', {"id" : productId})
            var promise = ProductService.getProductDetailById(productId);
            promise.then(function(response) {
                if(response.data) {
                    vm.product = response.data.product;
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

        function payProductAmount(rayzorPaymentId) {
          var promise = ProductService.payAmount(rayzorPaymentId);
          promise.then(function(response) {
              if(response.data) {
                  console.log('dtata---');
              } else {
                  console.log('Fuck you');
              }
          });
        }

        
        vm.payNow = function() {
            var options = {
                "key": "rzp_test_LuGtQt0DtkaqfC",
                "amount": "100", // 2000 paise = INR 20
                "name": "Studio 149",
                "description": "Purchase Description",
                "image": "",
                "handler": function (response) {
                    payProductAmount(response.razorpay_payment_id);
                },
                "prefill": {
                    "name": "",
                    "email": ""
                },
                "notes": {
                    "address": "Hello World"
                },
                "theme": {
                    "color": "#F37254"
                }
            };
            var rzp1 = new Razorpay(options);
            rzp1.open();
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
