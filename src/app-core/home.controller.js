var app = angular.module("app", []);

app.controller("home", function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});