'use strict';

var gulp = require( 'gulp' ),
	config = require( './config' );

gulp.task( 'compile:images', function() {
	console.log( config.notify.update( '\n------------------------- Running Images tasks --------------------------\n' ) );
	return gulp.src(config.source.images + '/*.*')
		.pipe(gulp.dest(config.build.images));
});

gulp.task( 'compile:fonts', function() {
	console.log( config.notify.update( '\n------------------------- Running Fonts tasks --------------------------\n' ) );
	return gulp.src(config.source.fonts + '/*.*')
		.pipe(gulp.dest(config.build.fonts));
});

//gulp scripts task which compress and hint all application js files
gulp.task( 'compile:assets', ['compile:fonts', 'compile:images'], function() {
	console.log( config.notify.update( '\n------------------------- Running Assests tasks --------------------------\n' ) );
	return gulp.src( 'app/index.html' )
		.pipe(gulp.dest('../build/'));
});