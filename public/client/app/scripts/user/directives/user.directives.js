var app = angular.module('app.user');

app.directive("matchPassword", function () {
    return {
        require: "ngModel",
        scope: true,
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.matchPassword = function(confirmPassword) {
                var password = $('#' + attributes.matchPassword).val();
                return confirmPassword === password;
            };

            scope.$watch("passwordConfirm", function() {
                ngModel.$validate();
            });
        }
    };
});