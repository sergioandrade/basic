(function(){
	"use strict";
	/*
	 * @description Confguração das rotas com o ui.router
	 */
	 
	angular.module("aprove.core")
	.config([
		"$locationProvider",
		"$stateProvider",
		"$urlRouterProvider",
		function($locationProvider, $stateProvider, $urlRouterProvider){
			$urlRouterProvider.otherwise("/");
			$stateProvider

			.state("root", {
				url: "",
				abstract: true,
				template: "<div ui-view></div>"
			})

			.state("root.home", {
				url: "/",
				templateUrl: "./app/modules/home/home.html",
				controller: "HomeController",
				params: {
					nome: "parametro do controller da home"
				}
			})

			.state("root.criar-proposta", {
				url: "/criar-proposta",
				templateUrl: "./app/modules/proposta/criar-proposta/criar-proposta.html",
				controller: "CriarPropostaController",
				params: {
					nome: "criar propostas"
				}
			})
		}
	])

})();
