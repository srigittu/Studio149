( function() {
	'use strict';

	angular
		.module( 'app.order' )
		.service( 'OrderService', OrderService );

	/**
	 * @ngdoc Injector
	 * @name OrderService
	 * @description
	 * Order module service injection
	 * @module app.Order
	 * @author Tungstn Developers
	 */
	OrderService.$inject = [ 'OrderDataService' ];

	/**
	 * @ngdoc Service
	 * @name OrderService
	 * @description main service http request and response handler
	 * @module app.Order
	 * @author Tungstn Developers
	 */
	function OrderService( OrderDataService ) {
		var _self = this;

		/**
		 * @ngdoc Function
		 * @name _self.sendEnquiryDetails
		 * @desc Get Enquiry details
		 * @return {object} userInfo
		 */
		_self.sendEnquiryDetails = function(userInfo) {
			return OrderDataService.sendEnquiryDetails(userInfo);
		};
	}

} )();
