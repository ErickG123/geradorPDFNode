const express = require('express'); // Criar rotas
const ejs = require('ejs'); // Escrever JS no HTML
const path = require('path'); // Ajuda na criação de caminho de arquivos
const pdf = require('html-pdf'); // Gerar o PDF
const { response } = require('express');

const app = express();

const passengers = [
    {
        name: "Joyce",
        flightNumber: 7859,
        time: "18h00"
    },
    {
        name: "Brock",
        flightNumber: 7859,
        time: "18h00"
    },
    {
        name: "Eve",
        flightNumber: 7859,
        time: "18h00"
    }
]; 

app.get('/', (req, res) => {
    // Caminho até o arquivo que será o PDF
    const filePath = path.join(__dirname, "print.ejs");

    // Rederizando o arquivo
    ejs.renderFile(filePath, { passengers }, (err, html) => {
        // Se der erro...
        if(err) {
            return res.send('Erro na leitura do arquivo');
        }
        // Senão...

        // Configurações do PDF
        const options = {
            height: "11.21in",
            width: "8.5in",
            header: {
                height: "20mm"
            },
            footer: {
                height: "20mm"
            }
        }

        // Criar o PDF
        // e colocar ele em um arquivo (report.pdf)
        pdf.create(html, options).toFile("report.pdf", (err, pdf) => {
            if(err) {
                return res.send('Erro ao gerar o PDF');
            }

            // Enviando o PDF para o navegador
            return res.send(html);
           
        });
    });
});

app.listen(3000);