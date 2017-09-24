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
    function HomeController($scope, HomeService, OrderService, ProductService, toastr) {
        var vm = this;
        $(document).ready(function(){
            $('.slider-section').slick({
                slidesToShow: 3,
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
        $(document).ready(function(){
            $('.slider-studio-section').slick({
                slidesToShow: 3,
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
        $(document).ready(function(){
             $('.slider-carousel').slick({
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
        $(document).ready(function(){
             $('.home-slider-section').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay:true,
                dots: true,
                autoplaySpeed:5000,
                arrows:true,
                focusOnSelect: false,
                prevArrow: '<i class="fa fa-chevron-circle-left slick-prev" aria-hidden="true"></i>',
                nextArrow: '<i class="fa fa-chevron-circle-right slick-next" aria-hidden="true"></i>'
            });
        });

        $('#appointmentModal').on('hidden.bs.modal', function (e) {
            $(this)
            .find("input,textarea,select")
            .val('')
            .end();
        });

        vm.sendEnquiryDetails = function(userInfo) {
            userInfo.purpose = 'Schedule Appointment';
            userInfo.purposeType = 1;
            $('#appointmentModal').modal('hide');
            var promise = OrderService.sendEnquiryDetails(userInfo);
            promise.then(function(response) {
                if(response.data) {
                    toastr.success('You will be contacted by one of our representative shortly');
                    console.log('success-------');
                } else {
                    console.log('failure------');
                }
            });
        }

      vm.getSelectedProducts = function() {
          var productIds = [54, 22, 23, 24, 25];
          var data = {
              productIds: productIds
          }
          var promise = ProductService.getSelectedProducts(data);
          promise.then(function(response) {
              if(response.data) {
                  vm.carouselProducts = [];
                  vm.products = response.data.products;
                  console.log('before modification------', vm.products);
                  angular.forEach(vm.products, function(product) {
                     var productImages = product.product_detail.image.split(',');
                     product.productImages = productImages;
                  });
                    console.log('studio exclusive-------', vm.products[4].productImages[0]);
                  console.log('Home Products--------', vm.products);
                  vm.carouselProducts = vm.products.slice(1, 5);
                  console.log('Carousel Products--------', vm.carouselProducts);
              } else {
                  console.log('Sorry no products found');
              }
          });
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
                    vm.status = response.data.status;
                } else {
                    console.log('Sorry could not get product details');
                }
            });
      }
    }
    

    /**
     * @ngdoc Injector
     * @name HomeController
     * @module app.home
     * @description
     * All the dependency injections for home module
     * @author Tungstn Developers
     */
    HomeController.$inject = ['$scope', 'HomeService', 'OrderService', 'ProductService', 'toastr'];
} )();
