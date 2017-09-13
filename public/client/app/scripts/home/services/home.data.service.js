( function() {
	'use strict';

	angular
		.module( 'app.home' )
		.service( 'HomeDataService', HomeDataService );

	/**
	 * @ngdoc Injector
	 * @name HomeDataService
	 * @description
	 * Dashboard module service injection
	 * @module app.dashboard
	 * @author Tungstn Developers
	 */
	HomeDataService.$inject = [ '$http' ];

	/**
	 * @ngdoc Service
	 * @name HomeDataService
	 * @description  service http request and response handler
	 * @module app.dashboard
	 * @author Tungstn Developers
	 */
	function HomeDataService( $http ) {
		return {
			getHome: function() {
				return $http( {
					method: 'GET',
					url: '/api/home'
				} );
			}
		};
	}

} )();
