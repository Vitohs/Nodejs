import express from "express"
import path from "path"
//funções para trabalhar com caminhos em ES Modules.
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express()
const porta = 1169

//Obtém o diretório do arquivo atual em ES Modules
const __dirname = dirname(fileURLToPath(import.meta.url));

//Monta o caminho absoluto para a pasta 'views'
const basePath = path.join(__dirname, 'views')

app.get('/', (req,res)=>{
    res.sendFile(`${basePath}/index.html`)
})

app.get('/vv', (req,res)=>{
    res.sendFile(`${basePath}/outra.html`)
})

app.get('/teste', (req,res)=>{
    res.sendFile(`${basePath}/teste.html`)
})

app.listen(porta, (erro)=>{
    if(erro){
        console.log(erro)
        return
    }
    console.log(`servidor rodando na porta: ${porta}`)
})