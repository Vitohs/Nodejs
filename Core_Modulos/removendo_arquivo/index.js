const fs = require('fs')

setTimeout(() => {
    fs.writeFile('arquivo.txt', "aaaa", (error)=>{
        if(error){
            console.log(error)
            return
        }
        console.log('arquivo criado')
    })
}, 1000);

setTimeout(() => {
    fs.unlink('arquivo.txt', (error)=>{
        if(error){
            console.log(error)
            return
        }
        console.log('arquivo excluido')
    })
}, 2000);