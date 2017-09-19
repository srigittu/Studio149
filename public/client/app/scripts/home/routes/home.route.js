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
					.state( 'studio', {
						url: '/studio',
						templateUrl: '../app/scripts/home/views/studio.html',
						controller: 'HomeController as homeCtrl'
					} )
					.state( 'press', {
						url: '/press',
						templateUrl: '../app/scripts/home/views/press.html',
						controller: 'HomeController as homeCtrl'
					} )
					.state( 'terms', {
						url: '/terms',
						templateUrl: '../app/scripts/home/views/terms-of-service.html',
						controller: 'HomeController as homeCtrl'
					} )
					.state( 'pricing', {
						url: '/pricing',
						templateUrl: '../app/scripts/home/views/pricing.html',
						controller: 'HomeController as homeCtrl'
					} )
					.state( 'refunds', {
						url: '/refunds',
						templateUrl: '../app/scripts/home/views/refunds.html',
						controller: 'HomeController as homeCtrl'
					} )
					.state( 'privacypolicy', {
						url: '/privacypolicy',
						templateUrl: '../app/scripts/home/views/privacy-policy.html',
						controller: 'HomeController as homeCtrl'
					} );
			}
		]
	);
} )();
