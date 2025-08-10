import express from 'express'
import chalk from 'chalk'
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import rotas from './routes/rotas.js';
const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url));
const basePath = path.join(__dirname, 'views')
///servidor
const porta = 777
//variavel para a checagem da pseudo credencial do usuario
var pass = true

//middleware para analisar body do request
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

//permitindo que o node entenda os arquivos estáticos
app.use(express.static('public'))

//middlware para analizar se usuario pode ou não estar na pagina especifica
function talves(req,res,next){
    if(pass){
        console.log(chalk.bgGreen('Usuario liberado :)'))
        next()
    }
    else{
        console.log(chalk.bgRed('Usuario bloqueado :('))
        res.redirect('/')
        return
    }
}
//incluindo as rotas que separei da index
app.use('/user', rotas)

app.get('/carros', talves, (req,res)=>{
    res.sendFile(`${basePath}/carros.html`)
})

app.get('/', (req,res)=>{
    res.sendFile(`${basePath}/home.html`)
})

//pagina de 404 - not found
app.use(function(req,res,next){
    res.status(404).sendFile(`${basePath}/404.html`)
})

//escutano a porta
app.listen(porta,(erro)=>{
    if(erro){
        console.log(`erro identificado: ${erro}`)
        return
    }
    console.log(chalk.bgYellowBright(`Servidor rodando na porta: ${porta}`))
})