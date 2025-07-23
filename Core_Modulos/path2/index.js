const path = require('path')
const fs = require('fs')

setTimeout(()=>{
    fs.writeFile('arquivo.txt', 'lauren ipsilumn', function(erro, content){
        if(erro){
            console.log(erro)
            return
        }
        console.log('arquivo criado com sucesso :)')
        return
    })
}, 1000)

//caminho absoluto
setTimeout(()=>{
    console.log(`caminho absoluto do arquivo escolhido : ${path.resolve('arquivo.txt')}`)
}, 2000)

//criando um path
setTimeout(()=>{
    const pasta = 'User'
    const arquivoName = 'oie.txt'
    const PathFInal = path.join('/', 'C:', pasta, arquivoName)
    console.log(PathFInal)
}, 3000)