/*===========================================================
 GULP : APP TASKS :: Download external file paths
===========================================================*/

'use strict';
var gulp = require( 'gulp' );
var download = require("gulp-download");
var concat = require("gulp-concat");
var config = require( './config' );

//gulp scripts task to download external application files
gulp.task( 'download:ext-libs', function() {
	console.log( config.notify.update( '\n----------------------- Downloading external files ---------------------\n' ) );
	return download(config.source.download_urls)
		.pipe(gulp.dest(config.source.download));
});

//gulp scripts task which compress and hint all application js files
gulp.task( 'compile:ext-libs', [ 'download:ext-libs' ], function() {
	console.log( config.notify.update( '\n------------------------- Running Bower tasks --------------------------\n' ) );
	return gulp.src( config.source.download + '/*.*' )
		.pipe( concat( 'libraries.js' ) )
		.pipe( gulp.dest( config.build.js ) );
} );