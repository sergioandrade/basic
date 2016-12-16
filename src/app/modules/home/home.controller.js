(function(){
	"use strict";

	angular.module("aprove.home")
	.controller("HomeController", [
		"$scope",
		"$log",
		"$stateParams",
		function($scope, $log, $stateParams){
			$log.debug('controler ' + $stateParams.nome);
		}
	])
})();

