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
        var fixedImageString = "http://localhost:5000/";
        vm.selectedSize = '';
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

        $('#paymentModal').on('hidden.bs.modal', function (e) {
            $(this)
            .find("input,textarea,select")
            .val('')
            .end();
        });

        $('#sizeModal').on('hidden.bs.modal', function (e) {
            $(this)
            .find("img")
            .val('')
            .end();
        });

        $(document).ready(function(){
            $('.preview-slider-section').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay:true,
                dots: true,
                autoplaySpeed:6000,
                arrows:true,
                focusOnSelect: false,
                prevArrow: '<i class="fa fa-chevron-circle-left slick-prev" aria-hidden="true"></i>',
                nextArrow: '<i class="fa fa-chevron-circle-right slick-next" aria-hidden="true"></i>'
            });
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

        vm.openModal = function(modalType) {
          if(vm.selectedSize == '') {
            toastr.error('Please select a size');
            return;
          }
          if (modalType == 'user') {
            $('#userModal').modal('show');
          } else {
            $('#paymentModal').modal('show');
          }
            
        }

        vm.getProductDetail = function(prodId) {
            var productId = '';
            if($stateParams.id) {
              productId = $stateParams.id;
            } else {
                productId = prodId;
            }
            var productImages = [];
            $state.go('product-detail', {"id" : productId})
            var promise = ProductService.getProductDetailById(productId);
            promise.then(function(response) {
                if(response.data) {
                    vm.product = response.data.product;
                    productImages = vm.product.product_detail.image.split(',');
                    vm.product.productImages = productImages;
                    console.log('Single Product-----', vm.product);
                    options.amount = vm.product.product_detail.price * 100;
                } else {
                    console.log('Sorry could not get product details');
                }
            });
        }

        vm.sendEnquiryDetails =function(userInfo) {
            userInfo.purpose = 'Interest On Product';
            userInfo.purposeType = 2;
            userInfo.productId = vm.product.id;
            $('#paymentModal').modal('hide');
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
            if(vm.userBuyingDetails.phone.toString().length !== 10) {
                toastr.error('The mobile number must have 10 digits');
                return;
            }
            if(vm.userBuyingDetails.pincode.toString().length !== 6) {
                toastr.error('Pincode must have 6 digits');
                return;
            }
            $('#userModal').modal('hide');
            payNow(vm.userBuyingDetails, paymentOptions);
        }

        function payProductAmount(rayzorPaymentId) {
            var payment = {};
            payment.paymentId = rayzorPaymentId;
            payment.product = vm.product;
            payment.amount = vm.product.product_detail.price * 100;
            payment.user =    vm.userBuyingDetails;
            payment.user.selectedSize = vm.selectedSize;
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
