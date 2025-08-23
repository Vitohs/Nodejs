import chalk from 'chalk'
import express from 'express'
import hbs from 'express-handlebars'
import path from 'path';
import { fileURLToPath } from 'url';
const app = express()
const port = 8000
const user = {
    nome: 'vivi',
    idade: 19,
    auth: true
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'views', 'public')));


const verify = function verifica(req,res,next){
    if(user.auth){
        next()
    }
    else{
        console.log('eu sou obrigado a falar..')
        res.redirect('/')
    }
}


//variavel nescessaria para o node entender as partials
const partial = hbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', partial.engine)
app.set('view engine', 'handlebars')

app.get('/blog', (req,res)=>{
    const blog = {
        titulo: 'O segredo do violinista',
        categoria: 'literatura',
        autor: 'vv',
        ano: '2000 e sempre',
    }
    res.render('blog', {blog})
})

app.get('/estante', (req,res)=>{
    const blogs = [
        {
            titulo: 'O segredo do violinista',
            categoria: 'literatura',
            autor: 'vv',
            ano: '2000 e sempre',
        },
        {
            titulo: 'A jornada dos sonhos',
            categoria: 'aventura',
            autor: 'Yuri San e Fafá',
            ano: '2022',
        },
        {
            titulo: 'O mistério do tempo',
            categoria: 'ficção',
            autor: 'Ana Lima',
            ano: '2018',
        },
        {
            titulo: 'Códigos e Café',
            categoria: 'tecnologia',
            autor: 'Lucas Martins',
            ano: '2024',
        }
    ]
    res.render('estante', {blogs})
})

app.get('/dash', verify, (req,res)=>{
    const trikas = [
        "رافاييل",    // Rafael
        "كالييري",    // Calleri
        "لوسيانو",    // Luciano
        "أربوليدا",   // Arboleda
        "لوكاس مورا"  // Lucas Moura
    ]
    res.render('dashbord', {dado: user, trikas})
})

app.get('/', (req,res)=>{
    //enviando para o front uma variavel, para brincar la no html
    res.render('home', {dado: user})
})

app.listen(port, ()=>{
    console.log(chalk.bgGreen(`Servidor rodando na porta: ${port}`))
})