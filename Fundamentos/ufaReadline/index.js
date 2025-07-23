const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('qual é teu nome filho? ', (resposta)=>{
    console.log(`ai sim em ${resposta}`)
    rl.question(`ok ${resposta}, digite sua nota: `, (nota)=>{
        console.log(`boa ${resposta}, tu tirou nota: ${nota}`)
        rl.close()
    })
})