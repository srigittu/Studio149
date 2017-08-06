( function() {
	'use strict';

	var app = angular.module( 'app.home' );

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
				$urlRouterProvider
					.when( '/', 'home' )
					.otherwise( '/home' );

				$stateProvider
					.state( 'home', {
						url: '/home',
						templateUrl: '../app/scripts/home/views/home.html',
						controller: 'HomeController as homeCtrl'
					} )
					.state( 'product', {
						url: '/product',
						templateUrl: '../app/scripts/home/views/product.html',
						controller: 'HomeController as homeCtrl'
					} );
			}
		]
	);
} )();
