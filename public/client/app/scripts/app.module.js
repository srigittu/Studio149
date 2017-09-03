/*================================================================
App Studio149 Core
==================================================================*/
( function() {
	'use strict';

	angular.element( document ).ready( function() {
		angular.bootstrap( document, [ 'app' ] );
	} );

	/**
	 * @ngapp
	 * @name app
	 * @description
	 * Studio149 app module starts here
	 * @author Tungstn Developers
	 */
	angular.module( 'app', [
		'ui.router',
		'ngAnimate',
		'ngStorage',
		'app.header',
		'app.footer',
		'app.admin',
		'app.user',
		'app.home',
		'app.product'
	] );

} )();
