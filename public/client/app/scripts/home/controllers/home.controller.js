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

      vm.sendEnquiryDetails = function(userInfo) {
          userInfo.purpose = 'Schedule Appointment';
          userInfo.purposeType = 1;
          var promise = OrderService.sendEnquiryDetails(userInfo);
          promise.then(function(response) {
              if(response) {
                  toastr.success('You will be contacted by one of our representative shortly');
                  console.log('success-------');
              } else {
                  console.log('failure------');
              }
          });
      }

      vm.init = function() {
          var productIds = [1, 2, 3, 4];
          var promise = ProductService.getSelectedProducts(productIds);
          promise.then(function(response) {
              if(response) {
                  vm.products = response.data.products;
              } else {
                  toastr.error('Sorry no products found');
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
