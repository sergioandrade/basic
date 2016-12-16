(function(){
	"use strict";

	angular.module('aprove')
		.directive('dateInput', ["$rootScope",
		function($rootScope) {
			return {
				restrict: 'E',
				scope: {
					name: '@'
				},
				templateUrl: 'app/directives/date-input/date-input.html',
				link: function(scope, element, attrs) {
					element.on('change', function(event) {
						alert('mudou a data')
					});
				}
			}
		}
	]);
})();
