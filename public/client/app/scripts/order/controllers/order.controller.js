( function() {
    'use strict';
    
    angular
        .module('app.order')
        .controller('OrderController', OrderController);


    /**
     * @ngdoc OrderController
     * @name OrderController
     * @module app.Order
     * @description
     * Order controller contains all the models related to Order module
     * @author Tungstn Developers
     */
    function OrderController($scope, OrderService) {
      var vm = this;
      vm.user = {};

      vm.sendEnquiryDetails = function(userInfo) {
          OrderService.sendEnquiryDetails(userInfo);
      }

      $('#paymentModal').on('hidden.bs.modal', function () {
          $(this).find("input,textarea,select").val('').end();
      });
    }

    /**
     * @ngdoc Injector
     * @name OrderController
     * @module app.order
     * @description
     * All the dependency injections for Order module
     * @author Tungstn Developers
     */
    OrderController.$inject = ['$scope', 'OrderService'];
} )();