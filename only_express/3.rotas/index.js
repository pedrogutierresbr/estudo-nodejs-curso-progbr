const express = require("express");

const port = 3001;
const app = express();

let alunos = [
    { id: 0, nome: "Jose" },
    { id: 1, nome: "Maria" },
    { id: 2, nome: "Joao" },
    { id: 3, nome: "Marcos" },
];

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/alunos", (req, res) => {
    res.json(JSON.stringify(alunos));
});

app.get("/aluno", (req, res) => {
    console.log(req.body);
    let aluno = alunos[req.body.id];
    res.json(aluno);
});

//via query (para funcionar essa maneira, o URL tem que ser algo assim: http://localhost:3001/aluno?id=1)
// app.get("/aluno", (req, res) => {
//     console.log(req.body);
//     console.log(req.query);
//     let aluno = alunos[req.query.id];
//     res.json(aluno);
// });

//via rota
app.get("/aluno/:id", (req, res) => {
    console.log(req.params.id);
    let aluno = alunos[req.params.id];
    res.json(aluno);
});

app.listen(port, () => {
    console.log("Servidor inicializado na porta 3001");
});

// Qual utilizar, via query ou via rota?
// Depende, existe problema em o usuário ver suas informações na URL?
// Se sim, use o tipo de infromação passada no body da requisição
// Se não, utilize via query como querer
