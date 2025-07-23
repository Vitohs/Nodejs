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
    fs.rename('arquivo.txt', 'oiiee.txt', function(error){
        if(error){
            console.log(error)
            return
        }
        console.log('arquivo renomeado com sucesso')
    })
}, 2000);