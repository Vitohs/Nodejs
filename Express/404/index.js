import express from 'express'
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import rotas from './routes/rotas.js';

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

//arquivos estaticos
app.use(express.static('public'))

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
//separamos as rotas relacionadas a users em outra pasta, para o index estar o mais clean possivel
//após exportar e importar, usamos o use do express, evidenciamos o nome da rota, e colocamos a variavel de rotas que importamos
//para entender melhor, estamos com uma caixa de chocolate, tem escrito na caixa "chocolate", como colocamos o nome "/users" novamente
//ficaria ambiguo, estaria assim "chocolate/chocolate", por conta disso, retiramos tudo o que é relacionado com users na pasta de rostas.js
//o middleware entende que semopre que contiver /users, ele precisa ir la pra pasta de rotas, ja que as rotas estão lá.
app.use('/users', rotas)

//jeito mais limpo de usar, para checar se o usuario pode ou nao acessar uma rota especifica.
app.get('/vip', checagem, (req, res)=>{
    res.sendFile(`${basePath}/vip.html`)
})
//rota principal.
app.get('/', (req,res)=>{
    res.sendFile(`${basePath}/home.html`)
})

//criando middleware para setar a pagina 404 not found
///após zerar as rotas possiveis e ainda sim não achar um camino que o usuario pediu, rodamos a view 404
app.use(function(req,res,next){
    res.status(404).sendFile(`${basePath}/404.html`)
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