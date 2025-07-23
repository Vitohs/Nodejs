const fs = require('fs')
const archerName = 'arquivo.txt'

setTimeout(() => {
    fs.writeFile(archerName, 'orochi', function(erro,data){
        if(erro){
            console.log(erro)
            return
        }
        console.log('arquivo criado com sucesso !')
        return
    })
}, 1000)

setTimeout(()=>{
    fs.stat(archerName,(erro,data)=>{
        if(erro){
            console.log(erro)
            return
        }
        console.log('veja detalhes desse arquivo abaixo')
        console.log(`É um arquivo ? : ${data.isFile()}`)
        console.log(`É um diretorio ? : ${data.isDirectory()}`)
        console.log(`É um link ? : ${data.isSymbolicLink()}`)
        console.log(`Tamanho do arquivo : ${data.size}`)
        console.log(`Data de criação : ${data.ctime}`)
    })
}, 2000)

setTimeout(()=>{
    fs.unlink(archerName, function(erro){
        if(erro){
            console.log(erro)
            return
        }
        console.log('arquivo excluido')
    })
}, 3500)