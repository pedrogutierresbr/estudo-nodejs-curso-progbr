const express = require("express");

const port = 3001;
const app = express();

let aluno = require("./routes/aluno");

app.use(express.urlencoded({ extended: true }));

app.use("/aluno", aluno);

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log("Servidor inicializado na porta 3001");
});
