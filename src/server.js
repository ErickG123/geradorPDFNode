const express = require('express'); // Criar rotas
const ejs = require('ejs'); // Escrever JS no HTML
const path = require('path'); // Ajuda na criação de caminho de arquivos
const puppeteer = require('puppeteer'); // Para gerar o PDF
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

// Criando rota para o PDF
// Usando puppeteer
app.get('/pdf', async (req, res) => {
    // Abre um navegador, mas não abre na minha tela
    const browser = await puppeteer.launch();
    // Abre uma nova página no navegador
    const page = await browser.newPage();

    // Espera a página e abre o um local
    await page.goto('http://localhost:3000', {
        waitUntil: 'networkidle0'
    });

    // Configurando o PDF
    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter'
    });

    // Fala que o conteúdo da rota é um PDF
    res.contentType("application/pdf");

    // Fecha o navegador
    await browser.close();

    // Envia o PDF para página
    return res.send(pdf);
});

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

        // Enviando o PDF para o navegador
        return res.send(html);
    });
});

app.listen(3000);