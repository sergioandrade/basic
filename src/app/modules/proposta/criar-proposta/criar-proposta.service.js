(function(){
	"use strict";
	/*
	 * @description Criar Proposta Service
	 */
	angular.module('aprove.criar-proposta')
	.service('CriarPropostaService', [
		'$http',
		function($http) {
			var _getData = function(){
				return $http.get('https://jsonplaceholder.typicode.com/photos');
			}
			return{
				getData: _getData
			}
		}
	])

})();