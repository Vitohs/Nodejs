import express, { Router } from 'express'
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const rotas = express.Router()
const __dirname = dirname(fileURLToPath(import.meta.url));
const basePath = path.join(__dirname, '../views')//precisei voltar uma pasta

//criando usuario
rotas.get('/add', (req,res)=>{
    res.sendFile(`${basePath}/create.html`)
})

rotas.post('/save', (req,res)=>{
    console.log(req.body)

    //extraindo o que puxamos do json para uma constante
    const nome = req.body.nome
    const email = req.body.email

    console.log(`nome do usuario: ${nome}, email dele: ${email}`)
    res.redirect('/')
})

//capturando um parametro na requisição
rotas.get('/:id', (req,res)=>{
    const id = req.params.id //capturando o valor passado pelo usuario
    //saindo algo generico só pra mostrar que deu certo
    console.log(`id capturado: ${id}`)
    res.sendFile(`${basePath}/users.html`)
})
export default rotas