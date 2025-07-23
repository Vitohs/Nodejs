const http = require('http')
const porta = 8000

const servidor = http.createServer((req,res)=>{
    //sugere uma conexão que foi bem sucedida 
    res.statusCode = 200
    //tornando possivel a interpretação para html
    res.setHeader('Contenty-Type', 'text;html')
    //conteudo aqui
    res.end('<h1>Papai calabreso</h1><br><p>mamae calabresa</p>')
})

servidor.listen(porta,()=>{
    console.log(`servidor rodando na porta: ${porta}`)
})