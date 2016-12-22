(function(){
	"use strict";
	/*
	 * @description httploading config register
	 */
	 angular.module("aprove.core")
	.config(["$httpProvider", function ($httpProvider) {
		$httpProvider.interceptors.push("httpLoading");
	}]);
	 
})();