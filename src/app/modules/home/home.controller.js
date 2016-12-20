(function(){
	"use strict";

	angular.module("aprove.home")
	.controller("HomeController", [
		"$scope",
		"$log",
		"$stateParams",
		"SETTINGS",
		function($scope, $log, $stateParams, SETTINGS){
			$log.debug('controler ' + $stateParams.nome);
			console.log(SETTINGS);
		}
	])

})();