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

	//App configurations for state and url proividers
	.config(
		[ '$stateProvider', '$urlRouterProvider',
			function( $stateProvider, $urlRouterProvider ) {
				$stateProvider
					.state( 'login', {
						url: '/login',
						templateUrl: '../app/scripts/user/views/login.html',
						controller: 'UserController as userCtrl'
					} )
					.state( 'register', {
						url: '/register',
						templateUrl: '../app/scripts/user/views/register.html',
						controller: 'UserController as userCtrl'
					} );
			}
		]
	);
} )();
