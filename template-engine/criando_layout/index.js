import express from 'express'
import hbs from 'express-handlebars'

const app = express()
const port = 8000

app.engine('handlebars', hbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req,res)=>{
    res.render('home')
})

app.listen(port, (erro)=>{
    if(erro){
        console.log(erro)
        return
    }
    console.log(`servidor rodando na porta: ${port}`)
})