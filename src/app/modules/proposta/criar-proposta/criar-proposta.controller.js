(function(){
	"use strict";
	/*
	 * @description Criar Proposta Controller
	 */

	angular.module("aprove.criar-proposta")
	.controller("CriarPropostaController", [
		"$scope",
		"CriarPropostaService",
		"ToastrFactory",
		function($scope, criarPropostaService, toastrFactory){
			$scope.load = function(){

				criarPropostaService.getData()
				.then(function(response){
					console.log(response);
					toastrFactory.success("Tudo certo!","Sua requisição foi processada com sucesso");
				})
				.catch(function(response){
					console.log(response);
					toastrFactory.error("Ops!","Algo não saiu como esperado, tente novamente mais tarde");
				});
			};
 		}
	]);

})();
