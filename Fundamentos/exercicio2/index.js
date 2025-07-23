import inquirer from "inquirer";
import chalk from "chalk";

inquirer.prompt([
    {
        name: 'nome',
        message: 'Digite seu nome: '
    },
    {
        name: 'idade',
        message: 'Digite sua idade'
    }
]).then(
    (resposta)=>{
        if(!resposta.nome || !resposta.idade){
            throw new Error('Nome e idade obrigação meu pivete')
        }
        console.log(chalk.bgYellow.italic.underline(`seu nome é ${resposta.nome}, e sua é ${resposta.idade}`))
    }
).catch(erro => console.log(erro))