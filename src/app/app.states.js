(function(){
	"use strict";

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
		}
	])


})();
