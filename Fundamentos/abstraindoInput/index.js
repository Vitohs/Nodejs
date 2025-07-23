import inquirer from "inquirer";

inquirer.prompt([
    {
        name: 'p1',
        message: 'Digite sua primeira nota: '
    },
    {
        name: 'p2',
        message: 'Digite sua segunda nota'
    }
]).then(
    (resposta)=>{
        console.log(`sua primeira nota foi: ${resposta.p1}, e a sua segunda nota foi de: ${resposta.p2}`)
        var media = ( parseInt(resposta.p1) + parseInt(resposta.p2) ) / 2 
        console.log(`a média deu: ${media}`)
    }
).catch(erro => console.log(erro))