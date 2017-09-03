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
        vm.products =   [
                            {'name': 'Yellow Lehenga with embroidery', 'image': 'product-1.jpg', 'description': 'Try that out to test your elegance'}, 
                            {'name': 'Pink Lehenga with embroidery', 'image': 'product-2.jpg', 'description': 'Try that out to test your elegance'}, 
                            {'name': 'Green Lehenga with embroidery', 'image': 'product-3.jpg', 'description': 'Try that out to test your elegance'}, 
                            {'name': 'Yellow Lehenga with embroidery', 'image': 'product-1.jpg', 'description': 'Try that out to test your elegance'}, 
                            {'name': 'Pink Lehenga with embroidery', 'image': 'product-2.jpg', 'description': 'Try that out to test your elegance'}, 
                            {'name': 'Green Lehenga with embroidery', 'image': 'product-3.jpg', 'description': 'Try that out to test your elegance'}
                        ];
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
