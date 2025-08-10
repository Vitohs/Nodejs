import express from 'express'
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const teste = true

const app = express()
const porta = 8000

const __dirname = dirname(fileURLToPath(import.meta.url));
const basePath = path.join(__dirname, 'views')

///permitir que o node analise o corpo da requisição
//usamos 2 middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json()) //trazendo o body como objeto javascript

const checagem = function(req,res,next){
    if(teste){
        console.log('pode irkk')
        next()
    }
    else{
        console.log('pode nãokk')
        res.redirect('/')
        return
    }
}

//criando usuario
app.get('/users/add', (req,res)=>{
    res.sendFile(`${basePath}/create.html`)
})

app.post('/users/save', (req,res)=>{
    console.log(req.body)

    //extraindo o que puxamos do json para uma constante
    const nome = req.body.nome
    const email = req.body.email

    console.log(`nome do usuario: ${nome}, email dele: ${email}`)
    res.redirect('/')
})

//capturando um parametro na requisição
app.get('/users/:id', (req,res)=>{
    const id = req.params.id //capturando o valor passado pelo usuario
    //saindo algo generico só pra mostrar que deu certo
    console.log(`id capturado: ${id}`)
    res.sendFile(`${basePath}/users.html`)
})
//jeito mais limpo de usar, para checar se o usuario pode ou nao acessar uma rota especifica.
app.get('/vip', checagem, (req, res)=>{
    res.sendFile(`${basePath}/vip.html`)
})
app.get('/', (req,res)=>{
    res.sendFile(`${basePath}/home.html`)
})

//middleware
//sintaxe para usar
// app.use(checagem)

app.listen(porta, (erro)=>{
    if(erro){
        console.log(erro)
        return
    }
    console.log(`servidor rodando na porta: ${porta}`)
})

