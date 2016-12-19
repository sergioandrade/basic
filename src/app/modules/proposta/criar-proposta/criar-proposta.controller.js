(function(){
	"use strict";
	/*
	 * @description Criar Proposta Controller
	 */
	angular.module('aprove.criar-proposta')
	.controller('criarPropostaController', [
		'$scope',
		'criarPropostaService',
		function($scope, criarPropostaService){
			$scope.load = function(){
				
				criarPropostaService.getData()
				.then(function(response){
					console.log(response);
				})
				.catch(function(response){
					console.log(response);
				})
			}
 		}
	])
})();