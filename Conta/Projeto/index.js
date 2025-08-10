import chalk from "chalk";
import inquirer from "inquirer";

//internos
import fs from 'fs'
import { error } from "console";
import { stringify } from "querystring";

var escolha

operacao()

function operacao(){
    inquirer.prompt([{
        type: 'list',
        name: 'acao',
        message: 'O que deseja fazer ?',
        choices: [
            'Criar conta.',
            'Consultar saldo.',
            'Depositar.',
            'Sacar.',
            'transação',
            'Sair.'
        ]
    }])
    .then(
        (yhwach)=>{
            const action = yhwach['acao']
            if(action === 'Criar conta.'){
                criarConta()
            } else if(action === 'Consultar saldo.'){
                getValorConta()
            } else if(action === 'Depositar.'){
                deposite()
            } else if(action === 'transação'){
                transa()
            }
             else if(action === 'Sacar.'){
                saque()
            } else if(action === 'Sair.'){
                console.log(chalk.bgBlue('Obrigado por me usar :)'))
                process.exit()
            }
        }
    )
    .catch(erro => console.log(erro))
}

function criarConta(){
    console.log(chalk.bgBlueBright('Obrigado por confiar em nóis paps.'))
    console.log(chalk.blueBright('Por favor, defina as opções para sua conta a seguir.'))
    buildConta()
}

function buildConta(){
    inquirer.prompt([{
        name: 'quest',
        message: 'Digite o nome da conta'
    }])
    .then(
        (asnwer) =>{
            const nomeConta = asnwer['quest']
            console.log(nomeConta)

            if(!fs.existsSync('contas')){
                fs.mkdirSync('contas')
            }
            if(fs.existsSync(`contas/${nomeConta}.json`)){
                console.log(
                    chalk.redBright('Perdão, já existe uma conta possuindo este nome, digite outro')
                )
                buildConta()
                return
            }
            fs.writeFileSync(`contas/${nomeConta}.json`, '{"balance": 0, "historico": []}', function(erro){
                console.log(erro)
            })
            console.log(chalk.green('Conta ciada com sucesso XD !!!'))
            operacao()
        }
    )
    .catch(err => console.log(err))
}

//depósito de grana

function deposite(){
    inquirer.prompt([{
        name: 'nomeConta',
        message: 'Qual nome da sua conta ?: '
    }])
    .then(
        (resposta) =>{
            if(!resposta.nomeConta){
                console.log(chalk.redBright('Digite um nome ai irmão'))
                deposite()  
                return
            }
            const nomeConta = resposta['nomeConta']
            const conta = verificar_conta(nomeConta)
            if(conta === false){
                console.log(chalk.redBright('Nome inválido, essa conta não existe no sistema, digite outro nome por favor.'))
                deposite()
                return
            }
            inquirer.prompt([{
                name: 'grana',
                message: 'Digite o valor que deseja depositar'
            }])
            .then(
                (resposta)=>{
                    const valor = resposta['grana']
                    addGrana(nomeConta,valor)
                    operacao()
                } 
            )
            .catch(err => console.log(err))
        }
    )
    .catch(erro => console.log(erro))
}

function verificar_conta(nome){
    if(!fs.existsSync(`contas/${nome}.json`)){
        return false
    }
    return true
}

function addGrana(contaNome,valor){
    const conta = getConta(contaNome)
    if(!valor){
        console.log(chalk.green('ocorreu um erro kk'))
        return deposite()
    }
    conta.balance = parseInt(valor) + parseInt(conta.balance)
    conta.historico.push({
        tipo: "depósito",
        valor: valor,
        data: new Date().toLocaleString()
    })
    fs.writeFileSync(`contas/${contaNome}.json`, JSON.stringify(conta),
        function(erro){
            console.log(erro)
        }
    )
    console.log(chalk.bgGreen.white(`Foi depositado R$${valor} na sua conta XD.`))
}

function getConta(conta){
    const contaJson = fs.readFileSync(`contas/${conta}.json`, {
        encoding: 'utf8', //permite acento
        flag: 'r' //read
    })
    return JSON.parse(contaJson)
}

function getValorConta(){
    inquirer.prompt([{
        name: 'nomeConta',
        message: 'qual nome da sua conta??'
    }])
    .then(
        (resposta) =>{
            const conta = resposta['nomeConta']
            if(!verificar_conta (conta)){
                console.log('digita certo ai carai')
                return  getValorConta()
            }
            const JsonConta = getConta(conta)
            console.log(`${chalk.green(`Você tem R$${JsonConta.balance} na conta`)}`)
            operacao()
        }
    )
    .catch(erro => console.log(erro))
}


//saque
function saque(){
    inquirer.prompt([{
        name: 'nome',
        message: 'qual nome da sua conta ?:'
    }])
    .then(
        (resposta)=>{
            const conta = resposta['nome']
            if(!verificar_conta(conta)){
                console.log(chalk.bgRed('conta não existe, tente outra'))
                return saque()
            }
            inquirer.prompt([{
                name: 'valor',
                message: 'quanto deseja sacar ?'
            }])
            .then(
                (resposta) =>{
                    const valor = resposta['valor']
                    removerValor(conta, valor)
                }
            )
            .catch(erro => console.log(erro))
        }
    )
    .catch(err => console.log(err))
}

function removerValor(conta, valor){
    const contaData = getConta(conta)
    if(!valor){
        console.log(chalk.red('ocorreu um erro, tente de novokk'))
        return saque()
    }
    if(contaData.balance < valor){
        console.log(chalk.bgRed('vai tirar mais do que tem mesmo ?????????'))
        return  saque()
    }
    contaData.balance = parseInt(contaData.balance) - parseInt(valor)
    contaData.historico.push({
        tipo: "saque",
        valor: valor,
        data: new Date().toLocaleString()
    })
    fs.writeFileSync(`contas/${conta}.json`, JSON.stringify(contaData), function(erro){
        console.log(erro)
    })
    console.log(chalk.bgGreenBright(`foi realizado um saque de R$${valor} XD`))
    operacao()
}

//transação
function transa(){
    inquirer.prompt([{
        name: 'nome',
        message: 'Qual conta deseja ver a transação'
    }])
    .then(
        (resposta) =>{

            const nomeConta = resposta['nome']
            if(!verificar_conta(nomeConta)){
                console.log(chalk.bgRed('conta não existe, tente outra'))
                return transa()
            }
            const JsonConta = getConta(nomeConta)
           JsonConta.historico.forEach((element, i) => {
                console.log('--------------------------');
                console.log(`Transação #${i + 1}:`);
                console.log(`Tipo: ${element.tipo}`);
                console.log(`Valor: R$${element.valor}`);
                console.log(`Data: ${element.data}`);
                console.log('--------------------------');
            });
        }
    )
    .catch(error => console.log(error))
}