( function() {
	'use strict';

	angular
		.module( 'app.home' )
		.service( 'HomeService', HomeService );

	/**
	 * @ngdoc Injector
	 * @name HomeService
	 * @description
	 * Home module service injection
	 * @module app.home
	 * @author Tungstn Developers
	 */
	HomeService.$inject = [ 'HomeDataService' ];

	/**
	 * @ngdoc Service
	 * @name HomeService
	 * @description main service http request and response handler
	 * @module app.home
	 * @author Tungstn Developers
	 */
	function HomeService( HomeDataService ) {
		var _self = this;

		/**
		 * @ngdoc Function
		 * @name _self.getHome
		 * @desc Get home details
		 * @return {object} home
		 */
		_self.getHome = function() {
			return HomeDataService.getHome();
		};
	}

} )();
