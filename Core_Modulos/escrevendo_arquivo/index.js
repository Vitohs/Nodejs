const fs = require('fs')

const http = require('http')
const porta = 8000

const servidor = http.createServer((req,res)=>{
    
    const UrlInfo = require('url').parse(req.url, true)
    const name = UrlInfo.query.name

    if(!name){
        fs.readFile('index.html', function(erro,conteudo){
            if(erro){
                res.writeHead(404,{'content-type': 'text/plain; charset=utf-8'})
                res.end('perdão, arquivo não encontrado')
                return
            }
            res.writeHead(200,{'content-type': 'text/html'})
            res.write(conteudo)
            return res.end()
        })
    }
    else{
        fs.writeFile('arquivo.txt', name, function(erro, conteudo){
            if(erro){
                console.log(erro)
                return
            }
            res.writeHead(302, {
                location: '/'
            })
            return res.end()
        })
    }
})

servidor.listen(porta,()=>{
    console.log(`Servidor rodando na porta: ${porta}`)
})