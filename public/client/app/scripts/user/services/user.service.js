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
	UserService.$inject = [ '$localStorage', 'UserDataService' ];

	/**
	 * @ngdoc Service
	 * @name UserService
	 * @description main service http request and response handler
	 * @module app.user
	 * @author Tungstn Developers
	 */
	function UserService( $localStorage, UserDataService ) {
		var _self = this;

		_self.getLocalUser = function() {
			return $localStorage.user;
		};

		_self.setLocalUser = function(user) {
			$localStorage.user = user; 
			return $localStorage.user;
		};

		_self.unsetLocalUser = function() {
			delete $localStorage.user;
		};

		_self.register = function(registerData) {
			return UserDataService.register(registerData);
		};

		_self.verifyEmail = function(id, token) {
			return UserDataService.verifyEmail(id, token);
		};

		_self.login = function(loginData) {
			return UserDataService.login(loginData);
		};

		_self.logout = function(id) {
			return UserDataService.logout(id);
		};

		_self.forgotPassword = function(forgotPasswordEmail) {
			return UserDataService.forgotPassword(forgotPasswordEmail);
		};

		_self.resetPassword = function(resetPasswordData) {
			return UserDataService.resetPassword(resetPasswordData);
		};

		_self.update = function(updateData) {
			return UserDataService.update(updateData);
		};
	}

} )();
