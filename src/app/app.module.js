(function(){
	"use strict";
	
	angular.module("aprove.core", [
		'ui.router'
	]);

	angular.module("aprove.home", []);

	//aprove extende os demais modulos filhos
	angular.module("aprove", [
		"aprove.core",
		"aprove.config",
		"aprove.home"
	]);

})();