const fs = require('fs')

if(!fs.existsSync('./pasta')){
    console.log('pasta não existe')
    fs.mkdirSync('./pasta')
    console.log('pasta criada')
}
else{
    console.log('pasta ja existe')
}

setTimeout(()=>{
    fs.writeFileSync('./pasta/texto.txt', 'donvito', (erro,data)=>{
        if(erro){
            console.log(erro)
            return
        }
        console.log('arquivo criado na pasta')
    })
}, 3000)