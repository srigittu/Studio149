( function() {
	'use strict';

	angular
		.module( 'app.user' )
		.factory( 'UserDataService', UserDataService );

	/**
	 * @ngdoc Injector
	 * @name UserDataService
	 * @description
	 * Dashboard module service injection
	 * @module app.user
	 * @author Ideas2IT Technologies
	 */
	UserDataService.$inject = [ '$http' ];

	/**
	 * @ngdoc Service
	 * @name UserDataService
	 * @description  service http request and response handler
	 * @module app.user
	 * @author Ideas2IT Technologies
	 */
	function UserDataService( $http ) {
		return {
			login: function(data) {
				return $http( {
					method: 'post',
					url: '/api/user/login',
					data: data
				} );
			},
			register: function(data) {
				return $http( {
					method: 'post',
					url: '/api/user/register',
					data: data
				} );
			},
			update: function(id, data) {
				return $http( {
					method: 'put',
					url: '/api/user/'+id,
					data: data
				} );
			}
		};
	}

} )();
