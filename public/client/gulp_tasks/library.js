'use strict';

var gulp = require( 'gulp' ),
	bower = require( 'bower' ),
	concat = require( 'gulp-concat' ),
	config = require( './config' );

// TASKS
gulp.task( 'install:bower', function( cb ) {
	console.log( config.notify.update( '\n--------------------- Installing Bower Components ----------------------\n' ) );
	bower.commands.install( [], {
			save: true
		}, {} )
		.on( 'end', function() {
			cb();
		} );
} );

//gulp scripts task which compress and hint all application js files
gulp.task( 'compile:libs', [ 'install:bower' ], function() {
	console.log( config.notify.update( '\n------------------------- Running Bower tasks --------------------------\n' ) );
	config.source.libs.push(config.build.js+'/libraries.js');
	return gulp.src( config.source.libs )
		.pipe( concat( 'libraries.js' ) )
		.pipe( gulp.dest( config.build.js ) );
} );