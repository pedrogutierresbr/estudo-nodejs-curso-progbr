// trabalhar um arquivo via node
let fs = require("fs"); // para importar um módulo interno do node

// --> criar um arquivo (nomeArquivo.extensão, conteúdo, callback para erro)
// fs.writeFile("teste.txt", "Hello friend", (error) => {
//     if (error) {
//         throw error;
//     }

//     console.log("arquivo criado com sucesso");
// });

//==============================================================================

// --> concatenar informação ao conteúdo ja esxistente (nomeArquivo.extensão, conteúdo a ser concatenado, callback para erro)
// fs.appendFile("teste.txt", " - How are you?", (error) => {
//     if (error) {
//         throw error;
//     }

//     console.log("arquivo atualizado com sucesso");
// });

//==============================================================================

// --> apagar arquivo (nomeArquivo.extensão, callback para erro)
// fs.unlink("teste.txt", (error) => {
//     if (error) {
//         throw error;
//     }

//     console.log("arquivo apagado com sucesso");
// });

//==============================================================================

// --> renomear um arquivo (nomeArquivo.extensão, novoNomeArquivo.extensão, callback para erro)
// fs.rename("Teste.txt", "NovoNome.txt", (error) => {
//     if (error) {
//         throw error;
//     }

//     console.log("arquivo renomeado com sucesso");
// });

//==============================================================================

// --> ler um arquivo (nomeArquivo.extensão, formato do arquivo, callback com erro e dados)
// fs.readFile("NovoNome.txt", "UTF8", (error, data) => {
//     if (error) {
//         throw error;
//     }

//     console.log(data);
// });

//==============================================================================

//código para criar um novo arquivo a partir de outro, com conteudo em uppercase

let args = process.argv.slice(2);
let fileName = args[0];

fs.readFile(fileName, "UTF8", (error, data) => {
    if (error) throw error;

    fs.writeFile(fileName + "_Uppercase", data.toUpperCase(), (error) => {
        if (error) throw error;

        console.log("Arquivo gerado com sucesso");
    });
});

/* No terminal:
Para dar erro: node uppercase.js naoExiste.js
Para da certo: node uppercase.js NovoNome.txt
*/
