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

	1. Compilar SASS ---------------------------  ☑ 
	2. Minificar e agrupar JS ------------------  ☑
	3. Injetar e ordenar os arquivos Angular ---  ☑
	4. Configurar Rotas e Módulos --------------  ☑
	5. Configurar variáveis de ambiente --------  ☑
	6. Configurar loaders ----------------------  ☑
	7. Configurar mensagens de erros e etc -----  ☑
	8. Usar template cache do Angular ----------  ✖

## License

[The MIT License (MIT)](http://opensource.org/licenses/mit-license.php)
