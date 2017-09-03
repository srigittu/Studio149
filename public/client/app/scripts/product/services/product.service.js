( function() {
	'use strict';

	angular
		.module( 'app.product' )
		.service( 'ProductService', ProductService );

	/**
	 * @ngdoc Injector
	 * @name ProductService
	 * @description
	 * Product module service injection
	 * @module app.product
	 * @author Tungstn Developers
	 */
	ProductService.$inject = [ 'ProductDataService' ];

	/**
	 * @ngdoc Service
	 * @name ProductService
	 * @description main service http request and response handler
	 * @module app.product
	 * @author Tungstn Developers
	 */
	function ProductService( ProductDataService ) {
		var _self = this;

		/**
		 * @ngdoc Function
		 * @name _self.getProducts
		 * @desc Get product details
		 * @return {object} product
		 */
		_self.getProducts = function() {
			return ProductDataService.getProduct();
		};
	}

} )();