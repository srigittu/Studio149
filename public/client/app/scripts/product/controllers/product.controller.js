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
    function ProductController($scope, $window, ProductService, OrderService, $stateParams, $state, toastr) {
        var vm = this;
        var categoryType = '';
        vm.user = {};
        vm.userBuyingDetails = {};
        var options = {
            "key": "rzp_live_YRGLNlUBXbRiPN",
            "amount": "", // 2000 paise = INR 20
            "name": "Studio 149",
            "description": "Purchase Description",
            "image": "",
            "handler": function (response) {
                payProductAmount(response.razorpay_payment_id, vm.userBuyingDetails);
            },
            "prefill": {
                "name": "",
                "email": ""
            },
            "notes": {
                "address": ""
            },
            "theme": {
                "color": "#F37254"
            }
        };

        $('#userModal').on('hidden.bs.modal', function (e) {
            $(this)
            .find("input,textarea,select")
            .val('')
            .end();
        });

        vm.getProductsByCategoryType = function() {
            vm.categoryName = $stateParams.categoryName;
            
            if (vm.categoryName == 'pret') {
                categoryType = 1;
            } else if (vm.categoryName == 'festive') {
                categoryType = 2;
            } else if (vm.categoryName == 'bridal') {
                categoryType = 3;
            }
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

        vm.getProductDetail = function() {
            var productId = $stateParams.id;
            $state.go('product-detail', {"id" : productId})
            var promise = ProductService.getProductDetailById(productId);
            promise.then(function(response) {
                if(response.data) {
                    vm.product = response.data.product;
                    options.amount = vm.product.product_detail.price * 100;
                    vm.status = response.data.status;
                } else {
                    console.log('Sorry could not get product details');
                }
            });
        }

        vm.sendEnquiryDetails =function(userInfo) {
            userInfo.purpose = 'Interest On Product';
            userInfo.purposeType = 2;
            userInfo.productId = vm.product.id;
            var promise = OrderService.sendEnquiryDetails(userInfo);
            promise.then(function(response) {
                if(response) {
                  toastr.success('You will be contacted by one of our representative shortly');
                    console.log('success------');
                } else {
                    console.log('failure------');
                }
            });
        }
        vm.sendUserPaymentDetails = function(userInfo) {
            vm.userBuyingDetails = userInfo;
            var paymentOptions = options;
            payNow(vm.userBuyingDetails, paymentOptions);
        }

        function payProductAmount(rayzorPaymentId) {
            var payment = {};
            payment.paymentId = rayzorPaymentId;
            payment.product = vm.product;
            payment.amount = vm.product.product_detail.price * 100;
            payment.user =    vm.userBuyingDetails;
            console.log(payment);
            var promise = ProductService.payAmount(payment);
            $('#userModal').modal("hide");
            promise.then(function(response) {
              if(response.data) {
                  console.log('data---');
              } else {
                  console.log('data not available');
              }
            });
        }

        vm.callRazorPay = function(options) {
            var rzp1 = new $window.Razorpay(options);
            rzp1.open();
        }
        
        function payNow(userInfo, options) {
            vm.callRazorPay(options);
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
    ProductController.$inject = ['$scope', '$window', 'ProductService', 'OrderService', '$stateParams', '$state', 'toastr'];
} )();
