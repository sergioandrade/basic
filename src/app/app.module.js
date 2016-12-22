(function(){
	"use strict";
	/*
	 * @description Instancia-se os modulos que serão usados em toda a aplicação no core
	 */

	angular.module("aprove.core", [
		"ui.router"
	]);

	//intanciando cada módulo
	angular.module("aprove.home", []);
	angular.module("aprove.criar-proposta", []);

	//aprove extende os demais modulos filhos
	angular.module("aprove", [
		"aprove.core",
		"aprove.config",
		"aprove.home",
		"aprove.criar-proposta"
	]);

})();
