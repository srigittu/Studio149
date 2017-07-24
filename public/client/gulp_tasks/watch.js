/*===========================================================
 GULP: APP TASKS :: Watch -- all files
===========================================================*/
'use strict';

var gulp = require( 'gulp' );
var runSequence = require( 'run-sequence' );
var config = require( './config' );

//watching all html, js, scss and css file changes
gulp.task( 'watch', function() {

	console.log( config.notify.update( '\n----------------------- Watching All Files --------------------------\n' ) );
	var HTML = gulp.watch( [ 'app/*.html', 'app/**/*.html' ], [ 'compile:views' ] ),
		JS = gulp.watch( [ 'app/*.js', 'app/scripts/**/*.js' ], [ 'compile:scripts' ] ),
		SASS = gulp.watch( [ 'app/assets/scss/*.scss' ], [ 'compile:styles' ] ),
		BOWER = gulp.watch( [ 'bower_components/**/*.*', 'bower.json' ], [ 'compile:libs' ] );

	var log = function( event ) {
		if ( event.type === 'deleted' ) {
			runSequence( 'clean' );
			setTimeout( function() {
				runSequence( 'compile:views', 'compile:scripts', 'compile:styles', 'watch' );
			}, 500 );
		}
		console.log( config.notify.update( '\n--------- File ' + event.path + ' was ' + event.type + ' ---------\n' ) );
	};

	//on change print file name and event type
	HTML.once( 'update', log );
	SASS.once( 'update', log );
	JS.once( 'update', log );
	BOWER.once( 'update', log );
} );
