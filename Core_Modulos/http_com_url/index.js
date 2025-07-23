const http = require('http')
const porta = 8000

const servidor = http.createServer((req,res)=>{
    //pegando qual URL está chegando, quebro em varias partes
    const UrlInfo = require('url').parse(req.url,true)
    const name = UrlInfo.query.name //daqui eu extraio o nome que o usuario está buscando

    res.statusCode = 200
    res.setHeader('Contenty-Type', 'text;html')

    if(!name){
        res.end(
            '<h1>Por favor, insira seu nome</h1> <form method="GET"><input type="text" name="name" /><input type="submit" value="Enviar" /></form>'
        )
    }
    else{
        res.end(`<h1>Ola ${name} seja bem vindo</h1>`)
    }
})

servidor.listen(porta,()=>{
    console.log(`servidor rodando na porta: ${porta}`)
})