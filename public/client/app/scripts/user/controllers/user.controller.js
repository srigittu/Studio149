( function() {
    'use strict';
    
    angular
        .module('app.user')
        .controller('UserController', UserController);


    /**
     * @ngdoc UserController
     * @name UserController
     * @module app.user
     * @description
     * User controller contains all the models related to user module
     * @author Tungstn Developers
     */
    function UserController($state, $stateParams, UserService) {
        var vm = this;
        vm.user = {};

        vm.register = function () {
            var promise = UserService.register(vm.user);
            promise.then( function( response ) {
                if ( response.data.status !== 'error' ) {
                    $state.go('success_register');
                } else {
                    $state.go('login');
                }
            } );
        }

        vm.login = function () {
            var promise = UserService.login(vm.user);
            promise.then( function( response ) {
                if ( response.data.status !== 'error' ) {
                    $state.go('home');
                } else {
                    $state.go('login');
                }
            } );
        }

        vm.logout = function () {
            var promise = UserService.logout(vm.user.id);
            promise.then( function( response ) {
                if ( response.data.status !== 'error' ) {
                    $state.go('login');
                } else {
                    $state.go('login');
                }
            } );
        }

        vm.forgotPassword = function () {
            var promise = UserService.forgotPassword(vm.user);
            promise.then( function( response ) {
                if ( response.data.status !== 'error' ) {
                    $state.go('login');
                } else {
                    $state.go('login');
                }
            } );
        }

        vm.resetPassword = function () {
            vm.user.id = $stateParams.id;
            vm.user.token = $stateParams.token;
            var promise = UserService.resetPassword(vm.user);
            promise.then( function( response ) {
                if ( response.data.status !== 'error' ) {
                    $state.go('login');
                } else {
                    $state.go('login');
                }
            } );
        }

        vm.update = function (updateData) {
            UserService.update(updateData);
        }
    }

    /**
     * @ngdoc Injector
     * @name UserController
     * @module app.user
     * @description
     * All the dependency injections for user module
     * @author Tungstn Developers
     */
    UserController.$inject = ['$state', '$stateParams', 'UserService'];
} )();
