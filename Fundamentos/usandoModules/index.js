//importando um modulo e colocando em uma constante.
const fs = require('fs')

//aqui, estou utilizando metodo da constante, ler arquivo
//eu passo o caminho do arquivo, o tipo para poder validar acentos, e uma função anonima, ela vai conter erro e o conteudo do arquivo
//caso possua um erro, printa no console, caso não tiver, printa no console os dados do nosso arquivo de texto.
fs.readFile('arquivo.txt', 'utf8', (error,data)=>{
    if(error){
        console.log(error)
        return
    }
    console.log(data)
})

