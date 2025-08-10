import express, { Router } from 'express'
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const rotas = express.Router()
const __dirname = dirname(fileURLToPath(import.meta.url));
const basePath = path.join(__dirname, '../views')

rotas.get('/create',(req,res)=>{
    res.sendFile(`${basePath}/create.html`)
})
rotas.post('/save', (req,res)=>{
    console.log(req.body)
    res.redirect('/')
})
rotas.get('/:id', (req,res)=>{
    const id = req.params.id
    console.log(`id capturado: ${id}`)
    res.sendFile(`${basePath}/lista.html`)
})
export default rotas