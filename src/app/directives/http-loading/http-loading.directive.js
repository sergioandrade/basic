(function(){
	"use strict";
	/*
	 * @description Http Loading
	 */

	angular.module("aprove.core")
	.directive("httpLoading", [
		"$rootScope",
		"SETTINGS",
		"$timeout",
		 function ($rootScope, SETTINGS, $timeout) {
			return{
				link: function ($scope, element, attrs) {
					
					var timeout;
					var delay = SETTINGS.LOADING_DELAY;
				    
			        $scope.$on("loader_show", function () {
						timeout = $timeout(function() {
					        element.stop().fadeIn();
						}, delay);
			        })

			        $scope.$on("loader_hide", function () {
			            element.stop().fadeOut();
			        	$timeout.cancel(timeout);
			        })
			    }
			}		
		}
	])
	
})();