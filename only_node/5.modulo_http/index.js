const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Hello friend!</h1>");
}).listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Servidor iniciado na porta 3000");
    }
});

//para iniciar o servidor digite: node index.js
