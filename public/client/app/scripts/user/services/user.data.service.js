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
			register: function(data) {
				return $http( {
					method: 'post',
					url: '/api/user/register',
					data: data
				} );
			},
			verifyEmail: function(id, token) {
				return $http( {
					method: 'post',
					url: '/api/user/verify-email/'+id+'/'+token
				} );
			},
			login: function(data) {
				return $http( {
					method: 'post',
					url: '/api/user/login',
					data: data
				} );
			},
			logout: function(id) {
				return $http( {
					method: 'post',
					url: '/api/user/logout/'+id
				} );
			},
			forgotPassword: function(forgotPasswordData) {
				return $http( {
					method: 'post',
					url: '/api/user/forgot-password',
					data: forgotPasswordData
				} );
			},
			resetPassword: function(resetPasswordData) {
				return $http( {
					method: 'post',
					url: '/api/user/reset-password',
					data: resetPasswordData
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
