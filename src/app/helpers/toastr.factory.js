(function(){
	"use strict";
	/*
	 * @description Toastr Factory
	 */
	angular.module('aprove.core')
	.factory('ToastrFactory',[
	 	function () {
	 		toastr.options = {
	 			"closeButton": true,
	 			"debug": false,
	 			"newestOnTop": false,
	 			"progressBar": false,
	 			"positionClass": "toast-top-right",
	 			"preventDuplicates": true,
	 			"showDuration": "300",
	 			"hideDuration": "1000",
	 			"timeOut": "5000",
	 			"extendedTimeOut": "1000",
	 			"showEasing": "swing",
	 			"hideEasing": "linear",
	 			"showMethod": "fadeIn",
	 			"hideMethod": "fadeOut"
	 		}
	 		return {
	 			success: function (title, text) {
	 				toastr.success(text, title);
	 				toastr.success(text, title);
	 			},
	 			error: function (title, text) {
	 				toastr.error(text, title);
	 			},
	 			warning: function (title, text){
	 				toastr.warning(text, title);
	 			},
	 			info: function (title, text){
	 				toastr.info(text, title);
	 			}
	 		};
	 	}
	 ]);
})();