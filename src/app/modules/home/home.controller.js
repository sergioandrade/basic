(function(){
	"use strict";
	/*
	 * @description Home Controller
	 */

	angular.module("aprove.home")
	.controller("HomeController", [
		"$scope",
		"$log",
		"$stateParams",
		"SETTINGS",
		function($scope, $log, $stateParams, SETTINGS){
			$log.debug('controler ' + $stateParams.nome);
			$log.debug(SETTINGS);
		}
	]);

})();
