/*===========================================================
 GULP : APP TASKS :: HTML -- Minify html
===========================================================*/
'use strict';

var gulp = require( 'gulp' );
var htmlmin = require( 'gulp-htmlmin' );
var html2js = require( 'gulp-html2js' );
var config = require( './config' );

//gulp html task minify and convert into js
gulp.task( 'compile:views', function() {
	console.log( config.notify.update( '\n---------------------- Running HTML to JS tasks -----------------------\n' ) );
	gulp.src( [ config.source.root + '/*.html', config.source.root + '/**/*.html' ] )
		.pipe( htmlmin( {
			collapseWhitespace: true
		} ) )
		.pipe( html2js( 'templates.js', {
			adapter: 'angular',
			base: 'templates',
			name: 'app'
		} ) )
		.pipe( gulp.dest( config.build.js ) );
} );