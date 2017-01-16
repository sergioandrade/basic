<img src="http://logo.basic.surge.sh/basic.png" width="300px">

<br>
> _Basic_ - Boilerplate para projetos web

Basic é uma ferramenta para fazer aplicações usando angular, sass, gulp e outras coisas.


## Instalação

```shell
$ npm install
```
Através do npm install, o basic vai buscar todas as dependências necessárias para rodar e após isso vai chamar o `bower install` automaticamente

## Rodando modo desenvolvimento
```shell
$ npm run dev
```
No modo development a aplicação inicia com servidor via browser-sync, porém não faz o uglify dos arquivos .js e adiciona comentários em cada linha css através do sass, isso ajuda a debugar.


## Rodando para fazer o build para produção
```shell
$ npm run prod
```
No modo production a aplicação apenas faz o build, minificando os arquivos e otimizando o máximo a aplicação. Não inicia o servidor http, apenas gera em `/dist` todos os arquivos necessários para a aplicação.


___
*TODO*

- [x] Compilar SASS  
- [x] Minificar e agrupar JS 
- [x] Injetar e ordenar os arquivos Angular 
- [x] Configurar Rotas e Módulos 
- [x] Configurar variáveis de ambiente 
- [x] Configurar loaders 
- [x] Configurar mensagens de erros e etc 
- [x] Validador de JavaScript 
- [x] Ambiente de testes com browser-sync 

## License

[The MIT License (MIT)](http://opensource.org/licenses/mit-license.php)
