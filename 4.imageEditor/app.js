//para esse projetinhoi foi utilizado o módulo sharp e compress images (para mais detalhes veja as documentações)
const sharp = require("sharp");
const compress_images = require("compress-images");
const fs = require("fs");

let path = process.argv[2];
let width = Number(process.argv[3]);
let rotate = Number(process.argv[4]);

function resize(inputPath, outputPath, width, rotate) {
    sharp(inputPath)
        .resize({ width: width })
        .rotate(rotate)
        .toFile(outputPath, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Redimensionado com sucesso!");
                compress(outputPath, "./compressed/");
            }
        });
}

function compress(inputPath, outputPath) {
    compress_images(
        inputPath,
        outputPath,
        { compress_force: false, statistic: true, autoupdate: true },
        false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (error, completed, statistic) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");

            fs.unlink(inputPath, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(inputPath, "Apagado com sucesso!");
                }
            });
        }
    );
}

//para rodar o programada digite no terminal: node app.js <nome da imagem-caminho> <tamanho da largura que quer> <grau de rotação>
//ex: node app.js imagem.jpg 500 180

resize(path, "./temp/output_resize.jpg", width, rotate);
