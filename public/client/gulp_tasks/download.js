/*===========================================================
 GULP : APP TASKS :: Download external file paths
===========================================================*/

'use strict';
var gulp = require( 'gulp' );
var download = require("gulp-download");
var config = require( './config' );

//gulp scripts task to download external application files
gulp.task( 'download:ext-libs', function() {
	console.log( config.notify.update( '\n----------------------- Downloading external files ---------------------\n' ) );
	download(config.download_url)
		.pipe(gulp.dest(config.download_libs));
});

//gulp scripts task which compress and hint all application js files
gulp.task( 'compile:ext-libs', [ 'download:ext-libs' ], function() {
	console.log( config.notify.update( '\n------------------------- Running Bower tasks --------------------------\n' ) );
	return gulp.src( config.source.ext_libs )
		.pipe( concat( 'libraries.js' ) )
		.pipe( gulp.dest( config.build.js ) );
} );