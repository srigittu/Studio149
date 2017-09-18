( function() {
	'use strict';

	var app = angular.module( 'app' );

	app.config( httpConfig );

	httpConfig.$inject = [
		'$httpProvider', '$sceDelegateProvider', '$locationProvider', '$qProvider', 'config'
	];

	function httpConfig( $httpProvider, $sceDelegateProvider, $locationProvider, $qProvider, config ) {

		$httpProvider.defaults.useXDomain = true;
		//$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
		delete $httpProvider.defaults.headers.common[ 'X-Requested-With' ];
		$sceDelegateProvider.resourceUrlWhitelist( [ '**' ] );

		var interceptor = [ '$q', '$rootScope', '$location', '$localStorage', function( $q, $rootScope, $location, $localStorage ) {

			return {
				//On Request
				'request': function( request ) {
					if ( request.url.indexOf( config.APP_API_URL_INDEX ) >= 0 ) {
						request.url = config.APP_API_DOMAIN + request.url;
					}
					request.headers = {
						'Content-Type': 'application/json; charset=UTF-8'
					};
					if (request.isFile) {
						request.headers = {
							'Content-Type': undefined
						};
					}
					if ($localStorage.user) {
						request.headers = {
							'apitoken': $localStorage.user.apitoken.token,
							'userid': $localStorage.user.apitoken.user_id
						};
					}
					$rootScope.isLoading = true;
					return request || $q.when( request );
				},
				//On Request Error
				requestError: function( rejection ) {
					$rootScope.isLoading = false;
					return $q.reject( rejection );
				},
				//On Response
				response: function( response ) {
					$rootScope.isLoading = false;
					return response;
				},
				//On Response Error
				responseError: function( rejection ) {
					$rootScope.isLoading = false;
					return $q.reject( rejection );
				}
			};
		} ];

		$httpProvider.interceptors.push( interceptor );
		$qProvider.errorOnUnhandledRejections( false );
		$locationProvider.hashPrefix( '' );
	}
} )();
