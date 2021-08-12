# Anotações e exercícios sobre Node JS do curso Prog BR

# Node JS

[https://nodejs.org/en/](https://nodejs.org/en/)

## O que é o Node JS?

**Node.js não é uma linguagem de programação.** Você programa utilizando a [linguagem JavaScript](https://www.luiztools.com.br/post/por-que-stanford-trocou-java-por-javascript/), a mesma usada há décadas no client-side das aplicações web. Javascript é uma linguagem de scripting interpretada, embora seu uso com Node.js guarde semelhanças com linguagens compiladas, uma vez que máquina virtual V8 (veja mais adiante) faz etapas de pré-compilação e otimização antes do código entrar em operação.

**Node.js não é um framework Javascript.** Ele está mais para uma plataforma de aplicação, na qual você escreve seus programas com Javascript que serão compilados, otimizados e interpretados pela máquina virtual V8. Essa VM é a mesma que o Google utiliza para executar Javascript no browser Chrome, e foi a partir dela que o criador do Node.js, Ryan Dahl, criou o projeto. O resultado desse processo híbrido é entregue como código de máquina server-side, tornando o Node.js muito eficiente na sua execução e consumo de recursos.

[https://www.luiztools.com.br/post/o-que-e-nodejs-e-outras-5-duvidas-fundamentais/](https://www.luiztools.com.br/post/o-que-e-nodejs-e-outras-5-duvidas-fundamentais/)

### Diferença entre servidor node e outros:

[https://qastack.com.br/programming/38821947/how-does-a-node-js-server-compare-with-nginx-or-apache-servers](https://qastack.com.br/programming/38821947/how-does-a-node-js-server-compare-with-nginx-or-apache-servers)

## Comandos iniciais

```jsx
node init --> Para você criar o arquivo package.json

npm install --> Para você instalar todos os arquivos de dependencias que estão no package.json
```

# Express

[https://expressjs.com/pt-br/](https://expressjs.com/pt-br/)

## Instalando o express

```jsx
npm init --> Para você criar o arquivo package.json (se colocar -y na frente, ele ja responde tudo default)

npm install express
```

## Código básico para criar um servidor

```jsx
const express = require("express");

const PORT = <número da porta>;
const app = express();

app.listen(PORT, () => {
    console.log("Servidor inicializado na porta 3001");
});
```

## Acessando o servidor por outros devices via rede Wi-fi

```jsx
se voce utilizar o comando: **ipconfig**

voce terá acesso ao **IPv4 Adress** (na parte Wireless LAN)

****Esse IP é o da máquina que você esta utilizando dentro da rede wi-fi. Digitando esse IP + :<numero da porta> no navegador de qualquer
device conectado a rede wifi, você tera acesso ao servido
```

## Como servir um site estático

```jsx
const express = require("express");
const path = require("path");

const PORT = 3001;
const app = express();

app.use(express.static(path.join(__dirname, "client")));

app.listen(PORT, () => {
    console.log("Servidor inicializado na porta 3001");
});
```

![imagem1](https://github.com/pedrogutierresbr/nodejs-curso-progbr/blob/main/assets/imagem1.png?raw=true)

Como deve estar a divisão do diretório para este exemplo

## Valores possíveis para o Type de uma resposta no express

-   res.type('.html') => 'text/html'
-   res.type('html') => 'text/html'
-   res.type('txt') => 'text/plain'
-   res.type('json') => 'application/json'
-   res.type('application/json') => 'application/json'
-   res.type('png') => 'image/png'

## HTTP request

Possui 3 partes:

-   Linha de requisição —> diz qual caminho, método de requisição utilizado, e versão do HTTP utilizada (padrão HTTP 1.1)
-   Header —> Tem toda a informação necessária para o servidor saber como processar/tratar os dados do body (diz qual tipo de arquivo esta sendo mandado, exemplo json, formulário, txt....)
-   Body —> Onde estão o conteúdo necessários para alimentar o servidor, para ele fazer alguma ação de acordo com os dados enviados

mais informações em: [https://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html](https://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html)

## HTTP response

Possui 3 partes:

-   Status —> contém a versão do HTTP, código do status, mensagem de retorno do status
-   Header —> informações para o cliente saber como lidar com a resposta
-   Body —>conteúdo retornado do servidor

mais informações:

[https://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html](https://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html)

[https://developer.mozilla.org/en-US/docs/Web/HTTP/Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## Método .use

Você o utiliza quando quer que um middleware seja executado para qualquer tipo de requisição (método http). Veja exemplo abaixo:

```jsx
const express = require("express");

const port = 3001;
const app = express();

let consoleMethod = (req, res, next) => {
    console.log(req.method);
    next();
};

let hello = (req, res) => {
    res.send("hello friend!");
};

app.use("/", consoleMethod);

app.get("/", hello);

app.post("/", hello);

app.listen(port, () => {
    console.log("Servidor inicializado na porta 3001");
});

//Nesse progra, ele imprime o método utilizado para qualquer requisição, porém a responde "hello friend!", só para os métodos GET e POST, como definido
```

## Acesso a conteúdo do body de uma requisição

Antes se utilizava o body-parser, porém com as releases mais novas do node ele foi implementado e deixou de ser dependência.

### Então como devo fazer?

Quando se recebe uma requisição com conteúdo no body (POST ou PUT), o conteúdo pode vir de diversos tipos (json, string, matriz, texto...), então precisamos fazer com que o node de um "parse" no conteúdo, transformando-o em um objeto. Veja o exemplo abaixo:

```jsx
const express = require("express");

const port = 3001;
const app = express();

//=============================================
let consoleMethod = (req, res, next) => {
    console.log(req.method);
    next();
};

let consoleBody = (req, res, next) => {
    console.log(req.body);
    next();
};

let hello = (req, res) => {
    res.send("hello friend!");
};
//=============================================

app.use(express.json()); //para quando o body da requisição for JSON (antes usava body-parser, agora é assim)
app.use(express.urlencoded({ extended: true })); //para quando o body da requisição for string ou matrizes (antes usava body-parser, agora é assim)

//extended --> diz para o express qual biblioteca ele deve utilizar para fazer o parsing do conteúdo das requisições que ele recebe
//extende: true --> vai utilizar a biblioteca qs. Biblioteca qs permite o aninhamento de objetos (nested objects), que é praticamente como o JSON trabalha
//extende: false --> vai utilizar a biblioteca querystring. Biblioteca querystring não suporta nested objects

app.use("/", consoleBody);

app.get("/", hello);

app.post("/", hello);

app.listen(port, () => {
    console.log("Servidor inicializado na porta 3001");
});
```

O link a seguir, explica de maneira facil quando utilziar express.json() ou express.urlencoded(). Links:

[https://www.ti-enxame.com/pt/javascript/o-que-sao-express.json-e-express.urlencoded/1045862988/](https://www.ti-enxame.com/pt/javascript/o-que-sao-express.json-e-express.urlencoded/1045862988/)

[https://pt.stackoverflow.com/questions/402275/o-que-significa-na-prática-o-urlencoded-do-expressjs](https://pt.stackoverflow.com/questions/402275/o-que-significa-na-pr%C3%A1tica-o-urlencoded-do-expressjs)
