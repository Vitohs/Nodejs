//utilizando o core module de http, selando ele em uma constante
const http = require('http')
//a porta tambem, onde o usuario ira se conectar
const porta = 8000

//criando um servidor, como mexemos na web, trabalhamos com requisição e resposta
const server = http.createServer((request, response)=>{
    //no caso lanço uma resposta padrão, assim que ele entrar no localhost porta x, vai se deparar com ela
    response.write("oooooo maaaae compra bobbie goods kkkkkkk")
    //finalizando a resposta, para não ter erro
    response.end()
})

//"escutando a porta"
//fiz função de callback para mostrar que deu certo a operação
server.listen(porta, ()=>{
    console.log(`labubu está na porta: ${porta}`)
})