(function(){
	"use strict";
	/*
	 * @description Date Input Service
	 */

	angular.module("aprove.core")
	.service("dateInput", [
		"$http",
		function($http) {
			var _gethttp = function(){
				return $http.get("http://correiosapi.apphb.com/cep/76873274");
			};
			return{
				gethttp: _gethttp,
			}
		}
	])

})();