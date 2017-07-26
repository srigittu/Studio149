'use strict';

var chalk = require('chalk');

/*-----------------------------------------------------------
 GULP: APP CONFIGURATION
 Source, Build folder and other application configuration
-----------------------------------------------------------*/
var config = function() {

    // Source Path
    var src = {
        root: 'app',
        index: 'app/index.html',
        css: [
            'bower_components/bootstrap/dist/css/bootstrap.min.css'
        ],
        scss: [
            'app/styles/scss/*.scss'
        ],
        js: 'app/scripts',
        images: 'app/assets/images',
        fonts: 'app/assets/fonts',
        bower: './bower_components',
        download_libs: './download_components',
        download_url: [
            ''
        ],
        libs: [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js'
        ],
        ext_libs: [
            ''
        ],
        zip: './zip'
    };

    // Build Path
    var build = {
        root: '../build',
        css: '../build/css',
        js: '../build/js',
        images: '../build/assets/images/',
        fonts: '../build/assets/fonts/'
    };

    //Server Configuration
    var serverConfiguration = {
        host: 'localhost',
        port: 3002,
        open: true,
        livereload: {
            enable: true,
            port: 35729
        }
    };

    //Default production mode set to false
    var production = false;

    //Bower Configuration
    var bowerConfiguration = {
        paths: {
            bowerDirectory: src.bower,
            bowerrc: '.bowerrc',
            bowerJson: 'bower.json'
        }
    };

    // Chalk config
    var notify = {
        error: chalk.red.bold,
        warning: chalk.black.bold.bgYellow,
        update: chalk.yellow.underline,
        success: chalk.green
    };

    return {
        source: src,
        build: build,
        serverConfiguration: serverConfiguration,
        production: production,
        bowerConfiguration: bowerConfiguration,
        notify: notify,
        serverIP: '127.0.0.1'
    };
};

module.exports = config();
