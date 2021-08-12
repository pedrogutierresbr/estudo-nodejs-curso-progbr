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

app.use(express.json()); //dito qual tipo de arquivo que sera trabalhado (API RestFul usa json)
app.use("/", consoleBody);

app.get("/", hello);

app.post("/", hello);

app.listen(port, () => {
    console.log("Servidor inicializado na porta 3001");
});
