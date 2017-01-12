(function(){
    "use strict";
    /*
     * @description Exception Handling Interceptor
     */

    angular.module("aprove.core")
    .factory("ExceptionHandlingInterceptor",[
        "$q",
        "$log",
        "$injector",
		"ToastFactory",
        function ($q, $log, $injector, toastFactory) {
            return {
                responseError: function (rejection) {
                    switch (rejection.status) {
                        case-1:
                        break;

                        case 0:
                        toastFactory.error("API Inacessível");
                        break;

                        case 400:
                        toastFactory.error("Requisição não concluída","O servidor não concluiu sua requisição");break;

                        case 403:
                        toastFactory.error("Falha na autenticação","Você não tem permissão para acessar este local");break;

                        case 500:
                        toastFactory.error("Servidor não encontrado","O servidor não foi encontrado ou encontra-se indisponível");
                        break;

                        default:
                        toastFactory.error("Ops!","Algo não saiu como esperado, tente novamente mais tarde.");
                    }
                    return $q.reject(rejection);
                }
            };
        }
    ]);

})();
