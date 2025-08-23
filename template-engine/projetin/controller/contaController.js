import fs from 'fs'
import userController from './userController.js'

const verificarCPF_GET = (req,res)=>{
    console.log('verificarCPF_GET - session:', req.session)
    res.render('cpf', {layout: 'autenticacao'})
}

const verificarCPF_POST = (req,res)=>{
    const cpf = userController.verificar_conta(req.body.cpf)
    if(cpf === false){
        const alerta = 'Essa conta não existe.'
        res.render('cpf', {alerta, layout: 'autenticacao'})
        return
    }
    const validado = userController.get_Conta(req.body.cpf)
    req.session.cpf = validado
    console.log('verificarCPF_POST - session:', req.session)
    res.redirect('/transferencia')
}

const transferGET =  (req,res)=>{
    console.log('transferGET - session:', req.session)
    const nome = req.session.cpf.Nome
    res.render('transferencia', {nome,layout: 'autenticacao'})
}

const transferPOST =  (req,res)=>{
    console.log('transferPOST - session:', req.session)
    const valor = req.body.grana
    if(valor > req.session.conta.saldo){
        const alerta = 'Não possui saldo suficiente'
        const nome = req.session.cpf.Nome
        res.render('transferencia', {nome,alerta, layout: 'autenticacao'})
        return
    }
    //adicionando dinheiro
    req.session.conta.saldo -= parseInt(valor)
    req.session.cpf.saldo += parseInt(valor)
    req.session.conta.historico.push({
        tipo: "transferencia",
        para: req.session.cpf.Nome,
        valor: valor,
        data: new Date().toLocaleString()
    })
    req.session.cpf.historico.push({
        tipo: "transferencia",
        de: req.session.conta.Nome,
        valor: valor,
        data: new Date().toLocaleString()
    })
    fs.writeFileSync(`contas/${req.session.conta.cpf}.json`, JSON.stringify(req.session.conta))
    fs.writeFileSync(`contas/${req.session.cpf.cpf}.json`, JSON.stringify(req.session.cpf))
    res.redirect('/')
}

const depositoGET = (req,res)=>{
    console.log(req.session.conta)
    res.render('deposito', {layout: 'autenticacao'})
}

const depositoPOST = (req,res)=>{
    const valor = req.body.valor
    if(valor <= 0){
        const alerta = 'valor inválido, por favor informe outro'
        res.render('deposito', {alerta, layout: 'autenticacao'})
        return
    }
    req.session.conta.saldo += parseInt(valor)
        req.session.conta.historico.push({
        tipo: "depósito",
        valor: valor,
        data: new Date().toLocaleString()
    })
    fs.writeFileSync(`contas/${req.session.conta.cpf}.json`, JSON.stringify(req.session.conta))
    console.log(req.session.conta)
    res.redirect('/')
}

const saqueGET = (req,res)=>{
    res.render('saque', {layout: 'autenticacao'})
}

const saquePOST = (req,res)=>{
    const valor = req.body.valor
    if(valor > req.session.conta.saldo){
        const alerta = 'Saldo insuficiente para sacar'
        res.render('saque', {alerta, layout: 'autenticacao'})
        return
    }
    req.session.conta.saldo -= parseInt(valor)
    console.log(req.session.conta)
    req.session.conta.historico.push({
        tipo: "saque",
        valor: valor,
        data: new Date().toLocaleString()
    })
    fs.writeFileSync(`contas/${req.session.conta.cpf}.json`, JSON.stringify(req.session.conta))
    res.redirect('/')
}

const faturaGET = (req,res)=>{
    const fatura = req.session.conta.historico
    res.render('fatura', {fatura, layout:'autenticacao'})
}

export default {
    transferGET,
    transferPOST,
    verificarCPF_GET,
    verificarCPF_POST,
    depositoGET,
    depositoPOST,
    saqueGET,
    saquePOST,
    faturaGET
}