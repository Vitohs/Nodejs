import chalk from 'chalk'
import express from 'express'
import exphbs from 'express-handlebars' //nome muito longo, fazendo convenção.

const app = express()
const port = 8000

//definindo o handlebars como template engine no express, executando em sequencia.
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars') //utilizando de fato, o handlebars para renderizar as views que faremos.
//contexto> app.engine registra || app.set define o padrão a ser usado

//GET: HOME
app.get('/', (req,res)=>{
    res.render('home', {layout: false})
})

//ouvo sim
app.listen(port, (erro)=>{
    if(erro){
        console.log(chalk.bgRed(erro))
        return
    }
    console.log(chalk.bgBlue('servidor rodando.'))
})