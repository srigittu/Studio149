( function() {
	'use strict';

	var app = angular.module( 'app.admin' );

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
					.state( 'admin', {
						url: '/admin',
						templateUrl: '../app/scripts/admin/views/admin.html',
						controller: 'AdminController as adminCtrl'
					} );
			}
		]
	);
} )();
