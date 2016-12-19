(function(){
	"use strict";

	angular.module('aprove.core')
	.directive("httpLoading", function ($rootScope) {
		return{
			template: '<div class="http-loading"></div>',
			link: function ($scope, element, attrs) {
		        $scope.$on("loader_show", function () {
		            return element.fadeIn();
		        })
		        return $scope.$on("loader_hide", function () {
		            return element.fadeOut();
		        })
		    }
		}		
	})
})();