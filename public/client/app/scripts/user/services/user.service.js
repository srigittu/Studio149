( function() {
	'use strict';

	angular
		.module( 'app.user' )
		.service( 'UserService', UserService );

	/**
	 * @ngdoc Injector
	 * @name UserService
	 * @description
	 * Home module service injection
	 * @module app.user
	 * @author Tungstn Developers
	 */
	UserService.$inject = [ 'UserDataService' ];

	/**
	 * @ngdoc Service
	 * @name UserService
	 * @description main service http request and response handler
	 * @module app.user
	 * @author Tungstn Developers
	 */
	function UserService( UserDataService ) {
		var _self = this;

		_self.login = function(loginData) {
			return UserDataService.login(loginData);
		};

		_self.register = function(registerData) {
			return UserDataService.register(registerData);
		};

		_self.update = function(updateData) {
			return UserDataService.update(updateData);
		};
	}

} )();
