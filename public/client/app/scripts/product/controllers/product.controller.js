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
    function ProductController($scope, ProductService) {
        var vm = this;
        console.log('gud product after');
    }

    /**
     * @ngdoc Injector
     * @name ProductController
     * @module app.product
     * @description
     * All the dependency injections for product module
     * @author Tungstn Developers
     */
    ProductController.$inject = ['$scope', 'ProductService'];
} )();
