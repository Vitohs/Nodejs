const fs = require('fs')
const url = require('url')
const http = require('http')
const porta = 8000

const servidor = http.createServer((req,res)=>{
    
    const UrlInfo = url.parse(req.url, true)
    if(UrlInfo.pathname == '/'){
        UrlInfo.pathname = '/index.html'
    }
    //aqui pega o nome do arquivo, pós o barra
    //exemplo www.shopee/home.html
    //filename = home.html
    const fileName = UrlInfo.pathname.substring(1)

    //aqui verifica se o arquivo possui html no nome, noss sistema só é projetado pra lidar com html
    if(fileName.includes('html')){
        //validou em cima, tem que ver se o arquivo existe
        if(fs.existsSync(fileName)){
            //existindo, le o arquivo e mostra no body
            fs.readFile(fileName, function(error, data){
                res.writeHead(200,{'content-type': 'text/html'})
                res.write(data)
                res.end()
            })
        }
        //não existe, lança o 404
        else{
            res.writeHead(404,{'content-type': 'text/plain; charset=utf-8'})
            res.end('perdão, arquivo não encontrado')
            return
        }
    }
})

servidor.listen(porta,()=>{
    console.log(`Servidor rodando na porta: ${porta}`)
})