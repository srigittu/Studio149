( function() {
	'use strict';

	var app = angular.module( 'app.user' );

	//App run time configurations
	app.run(
		[ '$rootScope', '$state', '$stateParams',
			function( $rootScope, $state, $stateParams ) {
				$rootScope.$state = $state;
				$rootScope.$stateParams = $stateParams;
			}
		]
	)

	//App configurations for state and url providers
	.config(
		[ '$stateProvider', '$urlRouterProvider',
			function( $stateProvider, $urlRouterProvider ) {
				$stateProvider
					.state( 'login', {
						url: '/login',
						templateUrl: '../app/scripts/user/views/login.html',
						controller: 'UserController as userCtrl',
						onEnter: function($state, UserService) {
							var user = UserService.getLocalUser();
							if (user) {
								$state.go('home');
							}
						}
					} )
					.state( 'logout', {
						url: '/logout',
						templateUrl: '../app/scripts/user/views/login.html',
						controller: 'UserController as userCtrl',
						onEnter: function($state, UserService) {
							var user = UserService.getLocalUser();
							if (user) {
								var promise = UserService.logout(user.id);
					            promise.then( function( response ) {
					                if ( response.data.status !== 'error' ) {
					                	UserService.unsetLocalUser();
					                    $state.go('login');
					                } else {
					                    $state.go('login');
					                }
					            } );
							} else {
								$state.go('login');
							}
						}
					} )
					.state( 'register', {
						url: '/register',
						templateUrl: '../app/scripts/user/views/register.html',
						controller: 'UserController as userCtrl'
					} )
					.state( 'success_register', {
						url: '/success-register',
						templateUrl: '../app/scripts/user/views/success-register.html',
						controller: 'UserController as userCtrl'
					} )
					.state( 'verify_email', {
						url: '/verify-email/:id/:token',
						onEnter: function($state, $stateParams, UserService) {
								var promise = UserService.verifyEmail($stateParams.id, $stateParams.token);
								promise.then( function( response ) {
									if ( response.data.status !== 'error' ) {
										$state.go('login');
									} else {
										$state.go('login');
									}
								} )
								.catch( function() {
									// logger.showMessage( 'error', 'Service unavailable.' );
								} );
						}
					} )
					.state( 'forgot_password', {
						url: '/forgot-password',
						templateUrl: '../app/scripts/user/views/forgot-password.html',
						controller: 'UserController as userCtrl'
					} )
					.state( 'reset_password', {
						url: '/reset-password/:id/:token',
						templateUrl: '../app/scripts/user/views/reset-password.html',
						controller: 'UserController as userCtrl'
					} );
			}
		]
	);
} )();
