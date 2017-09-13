( function() {
	'use strict';

	angular
		.module( 'app.admin' )
		.service( 'AdminService', AdminService );

	/**
	 * @ngdoc Injector
	 * @name AdminService
	 * @description
	 * Home module service injection
	 * @module app.admin
	 * @author Tungstn Developers
	 */
	AdminService.$inject = [ 'AdminDataService' ];

	/**
	 * @ngdoc Service
	 * @name AdminService
	 * @description main service http request and response handler
	 * @module app.admin
	 * @author Tungstn Developers
	 */
	function AdminService( AdminDataService ) {
		var _self = this;

		/**
		 * @ngdoc Function
		 * @name _self.getHome
		 * @desc Get admin details
		 * @return {object} admin
		 */
		_self.getAdminHome = function() {
			return AdminDataService.getAdminHome();
		};

		_self.addProduct = function(product) {
			return AdminDataService.addProduct(product);
		}
	}

} )();
