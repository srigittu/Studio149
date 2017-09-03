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
			getProducts: function() {
				return $http( {
					method: 'GET',
					url: '/api/product'
				} );
			}
		};
	}

} )();