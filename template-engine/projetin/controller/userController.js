import fs from 'fs'
import session from 'express-session'
const loginGET = (req,res)=>{
    res.render('login', {layout: 'autenticacao'})
}

const loginPOST = (req,res)=>{
    const cpf = verificar_conta(req.body.cpf)
    if(cpf === false){
        const alerta = 'Essa conta não existe.'
        res.render('login', {alerta, layout: 'autenticacao'})
        return
    }
    const conta = get_Conta(req.body.cpf)
    req.session.conta = conta
    res.redirect('/')
}

const cadastroGET = (req,res)=>{
    res.render('cadastro', {layout: 'autenticacao'})
}

const cadastroPOST = (req,res)=>{
    console.log(req.body)
    if(!fs.existsSync('contas')){
        fs.mkdirSync('contas')
    }
    if(fs.existsSync(`contas/${req.body.cpf}.json`)){
        const alerta = 'conta com esse cpf já está cadastrada'
        res.render('cadastro', {alerta, layout: 'autenticacao'})
    }
    fs.writeFileSync(`contas/${req.body.cpf}.json`, `{"Nome": "${req.body.nome}", "cpf": "${req.body.cpf}", "saldo": 0, "historico": []}`, function(erro){
        console.log(erro)
    })
    res.render('login', {layout: 'autenticacao'})
}

const home = (req,res)=>{
    const nome = req.session.conta.Nome
    const iconChar = nome.split('')[0]
    res.render('home', {conta: req.session.conta, char: iconChar})
}

function verificar_conta(cpf){
    if(!fs.existsSync(`contas/${cpf}.json`)){
        return false
    }
    return true
}
function get_Conta(conta){
    const contaJson = fs.readFileSync(`contas/${conta}.json`, {
        encoding: 'utf8', //permite acento
        flag: 'r' //read
    })
    return JSON.parse(contaJson)
}

export default {
    loginGET,
    home,
    loginPOST,
    cadastroGET,
    cadastroPOST,
    get_Conta,
    verificar_conta
}