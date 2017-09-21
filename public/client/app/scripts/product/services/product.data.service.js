( function() {
	'use strict';

	angular
		.module( 'app.product' )
		.service( 'ProductDataService', ProductDataService );

	/**
	 * @ngdoc Injector
	 * @name ProductDataService
	 * @description
	 * Dashboard module service injection
	 * @module app.product
	 * @author Tungstn Developers
	 */
	ProductDataService.$inject = [ '$http' ];

	/**
	 * @ngdoc Service
	 * @name ProductDataService
	 * @description  service http request and response handler
	 * @module app.product
	 * @author Tungstn Developers
	 */
	function ProductDataService( $http ) {
		return {
			getProductsByCategoryType: function(categoryType) {
				return $http( {
					method: 'GET',
					url: '/api/product/' + categoryType
				});
			},
			getProductDetailById: function(productId) {
				return $http( {
					method: 'GET',
					url: '/api/product-detail/' + productId
				});
			},
			payAmount: function(paymentData) {
				return $http({
					method: 'POST',
					url: '/api/payment/' + paymentData.paymentId,
					data: paymentData
				});
			},
			getSelectedProducts: function(productIds) {
				return $http({
					method: 'POST',
					url: '/api/products/selected/',
					data: productIds
				});
			}
		
		};


	}

} )();