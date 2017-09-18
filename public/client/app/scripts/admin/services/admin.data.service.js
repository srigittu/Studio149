( function() {
	'use strict';

	angular
		.module( 'app.admin' )
		.service( 'AdminDataService', AdminDataService );

	/**
	 * @ngdoc Injector
	 * @name AdminDataService
	 * @description
	 * Dashboard module service injection
	 * @module app.admin
	 * @author Ideas2IT Technologies
	 */
	AdminDataService.$inject = [ '$http' ];

	/**
	 * @ngdoc Service
	 * @name AdminDataService
	 * @description  service http request and response handler
	 * @module app.admin
	 * @author Ideas2IT Technologies
	 */
	function AdminDataService( $http ) {
		return {
			getAdminHome: function() {
				return $http( {
					method: 'GET',
					url: '/api/admin'
				});
			},
			addProduct: function(product) {
			    return $http({
                    method: 'POST',
					url: '/api/admin/add-product',
					data: product,
					isFile: true
				});
			}
		};
	}

} )();
