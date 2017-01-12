(function(){
	"use strict";
	/*
	 * @description Date Input directive
	 */

	angular.module("aprove")
		.directive("dateInput", ["$rootScope",
		function() {
			return {
				restrict: "E",
				scope: {
					name: "@"
				},
				templateUrl: "app/directives/date-input/date-input.html",
				link: function(scope, element) {
					element.on("change", function() {
						alert("mudou a data");
					});
				}
			};
		}
	]);

})();
