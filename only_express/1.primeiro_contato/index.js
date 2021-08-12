const express = require("express");
const path = require("path");

const PORT = 3001;
const app = express();

app.use("/meusite", express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
    res.send("<h1>hello friend from GET</h1>");
});

app.post("/", (req, res) => {
    res.send("<h1>hello friend from POST</h1>");
});

app.put("/", (req, res) => {
    res.send("<h1>hello friend from PUT</h1>");
});

app.delete("/", (req, res) => {
    res.send("<h1>hello friend from DELETE</h1>");
});

app.listen(PORT, () => {
    console.log("Servidor inicializado na porta 3001");
});
