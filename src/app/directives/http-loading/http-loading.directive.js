(function(){
	"use strict";

	angular.module('aprove.core')
	.directive("httpLoading", [
		"$rootScope",
		"SETTINGS",
		 function ($rootScope, SETTINGS) {
			return{
				template: '<div class="http-loading"></div>',
				link: function ($scope, element, attrs) {
					
					var timeout;
					var delay = SETTINGS.LOADING_DELAY;
				    
			        $scope.$on("loader_show", function () {
						timeout = setTimeout(function() {
					        element.fadeIn();
						}, delay);
			        })

			        $scope.$on("loader_hide", function () {
			            element.fadeOut();
			        	clearTimeout(timeout);
			        })
			    }
			}		
		}
	])
})();