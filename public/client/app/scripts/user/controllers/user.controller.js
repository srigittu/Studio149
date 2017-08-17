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
    function UserController($scope, $state, UserService) {
        var vm = this;
        vm.user = {};

        vm.login = function (loginData) {
            UserService.login(loginData);
        }

        vm.register = function () {
            console.log(vm.user);
            var registerData = vm.user;
            var promise = UserService.register(registerData);
            promise.then( function( response ) {
                if ( response.data.status !== 'error' ) {
                    $state.go('home');
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
    UserController.$inject = ['$scope', '$state', 'UserService'];
} )();
