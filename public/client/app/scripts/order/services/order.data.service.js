( function() {
	'use strict';

	angular
		.module( 'app.order' )
		.service( 'OrderDataService', OrderDataService );

	/**
	 * @ngdoc Injector
	 * @name OrderDataService
	 * @description
	 * Dashboard module service injection
	 * @module app.dashboard
	 * @author Tungstn Developers
	 */
	OrderDataService.$inject = [ '$http' ];

	/**
	 * @ngdoc Service
	 * @name OrderDataService
	 * @description  service http request and response handler
	 * @module app.order
	 * @author Tungstn Developers
	 */
	function OrderDataService( $http ) {
		return {
			sendEnquiryDetails: function(userInfo) {
				return $http( {
					method: 'POST',
                    url: '/api/enquiry',
                    data: userInfo
				} );
			}
		};
	}

} )();
