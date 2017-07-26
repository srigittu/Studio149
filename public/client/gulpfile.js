'use strict';

/*-----------------------------------------------------------
 GULP: DEPENDENCIES
 Define the variables of your dependencies in this section
-----------------------------------------------------------*/
var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp_tasks');

/*==========================================================
 GULP: ENVIRONMENT :: Gulp Default Tasks -- build
===========================================================*/

gulp.task('default', ['build']);


//requires the gulp-sass plugin to compile all sass files
/*var sass = require('gulp-sass');

var gutil = require('gulp-util');

var connect = require('gulp-connect-multi')();


 
gulp.task('server', connect.server({
  root: ['app'],
  port: 8000,
  livereload: true,
  open: {
    browser: 'google-chrome'
  }
}));

gulp.task('styles', function() {
	gutil.log('=====Gulp Starts=====')
	gulp.src('app/scss/*.scss').pipe(sass()).on('error', gutil.log).pipe(gulp.dest('app/css')).pipe(connect.reload())
    // gulp.src('app/index.html').pipe(gulp.dest('app/css'))	
});

gulp.task('log', function() {
	gutil.log('=====Gulp Starts=====')
});

//gulp watch tasks
gulp.task('watch', function(){
  gulp.watch('app/scss/*.scss', ['styles']); 
  // Other watchers
});

gulp.task('default', ['styles', 'server', 'watch']);*/
