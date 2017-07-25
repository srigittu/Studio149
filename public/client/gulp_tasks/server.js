/*===========================================================
 GULP : APP TASKS :: Start server and live reload
===========================================================*/
'use strict';

var gulp = require( 'gulp' );
var connect = require('gulp-connect-multi')();
var config = require( './config' );

console.log( config.notify.update( '\n----------------- Server started at -----------------------\n' ) );
gulp.task('server', connect.server({
	root: ['../build'],
	port: 5000,
	livereload: {
		enable: true,
		port: 35000
	},
	open: {
		browser: 'google-chrome'
	}
}));
