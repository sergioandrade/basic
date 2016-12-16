(function(){
	"use strict";

	angular.module("aprove.home")
	.controller("HomeController", [
		"$scope",
		"$log",
		"$stateParams",
		"env",
		function($scope, $log, $stateParams, env){
			$log.debug('controler ' + $stateParams.nome);
			console.log(env);
		}
	])

})();