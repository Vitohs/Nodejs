import chalk from "chalk";
import minimist from "minimist";

const argumentos = minimist(process.argv.slice(2))
const nome = argumentos['nome']
const nota = argumentos['nota']

if(nota >=7){
    console.log(chalk.bgGreenBright.italic.underline(`parabéns ${nome}, você passou`))
}
else{
    console.log(chalk.bgRedBright.italic.underline('vixx se fudeu kk'))
}