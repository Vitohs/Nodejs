const fs = require('fs')

console.log("inicio")

fs.writeFile("arquivo2.txt", "oiiii", function(erro){
    setTimeout(function(){
        console.log("arquivo criado")
    },3000)
})

console.log("fim")