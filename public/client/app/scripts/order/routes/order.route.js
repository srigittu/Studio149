( function() {
	'use strict';

	var app = angular.module( 'app.order' );

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
					.state( 'order', {
						url: '/order',
						templateUrl: '../app/scripts/product/views/order.html',
						controller: 'OrderController as orderCtrl'
					})
			}
		]
	);
} )();
