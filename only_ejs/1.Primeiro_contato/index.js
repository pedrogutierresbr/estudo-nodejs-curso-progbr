const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

let users = [
    {
        id: 0,
        name: "Pedro",
        phone: "(33) 33333-3333",
    },
    {
        id: 1,
        name: "Gabriel",
        phone: "(44) 44444-4444",
    },
    {
        id: 2,
        name: "Gutierres",
        phone: "(55) 55555-5555",
    },
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("user", { users: users });
});

app.listen(3004, () => {
    console.log("Servidor inicializado na porta 3004");
});
