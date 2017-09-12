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
				$stateProvider
					.state( 'products', {
						url: '/products/:categoryName',
						templateUrl: '../app/scripts/product/views/products.html',
						controller: 'ProductController as productCtrl'
					} )
					.state( 'product-detail', {
						url: '/product-detail/:id',
						templateUrl: '../app/scripts/product/views/product-detail.html',
						controller: 'ProductController as productCtrl'
					} );
			}
		]
	);
} )();
