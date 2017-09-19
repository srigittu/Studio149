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
    function HomeController($scope, HomeService, OrderService) {
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
            $('.header-image-section').slick({
                slidesToShow: 2,
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
        $(document).ready(function () {
        var carousel = $("#carousel").waterwheelCarousel({
          flankingItems: 3,
          movingToCenter: function ($item) {
            $('#callback-output').prepend('movingToCenter: ' + $item.attr('id') + '<br/>');
          },
          movedToCenter: function ($item) {
            $('#callback-output').prepend('movedToCenter: ' + $item.attr('id') + '<br/>');
          },
          movingFromCenter: function ($item) {
            $('#callback-output').prepend('movingFromCenter: ' + $item.attr('id') + '<br/>');
          },
          movedFromCenter: function ($item) {
            $('#callback-output').prepend('movedFromCenter: ' + $item.attr('id') + '<br/>');
          },
          clickedCenter: function ($item) {
            $('#callback-output').prepend('clickedCenter: ' + $item.attr('id') + '<br/>');
          }
        });

        $('#prev').bind('click', function () {
          carousel.prev();
          return false
        });

        $('#next').bind('click', function () {
          carousel.next();
          return false;
        });

        $('#reload').bind('click', function () {
          newOptions = eval("(" + $('#newoptions').val() + ")");
          carousel.reload(newOptions);
          return false;
        });

      });

      vm.sendEnquiryDetails = function(userInfo) {
          var promise = OrderService.sendEnquiryDetails(userInfo);
          promise.then(function(response) {
              if(response) {
                  console.log('success-------');
              } else {
                  console.log('failure------');
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
    HomeController.$inject = ['$scope', 'HomeService', 'OrderService'];
} )();
