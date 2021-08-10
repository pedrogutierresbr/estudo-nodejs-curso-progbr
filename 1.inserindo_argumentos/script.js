// como utilizar os argumentos

let args = process.argv.slice(2);

let a = Number(args[1]);
let b = Number(args[2]);
let c = "";

if (args[0] == "s") {
    c = soma(a, b);
} else if (args[0] == "m") {
    c = mult(a, b);
} else {
    c = "opção inválida";
}

function soma(x, y) {
    return x + y;
}

function mult(x, y) {
    return x * y;
}
console.log(c);

//No terminal, digite o comando abaixo, informando um valor para cada args:
// node script.js (s || m) (args[0]) (args[1])
