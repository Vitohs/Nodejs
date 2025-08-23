import exp from 'express'
import hbs from 'express-handlebars'
import userController from './controller/userController.js';
import contaController from './controller/contaController.js';
import session from 'express-session';
import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url';

const app = exp()
const porta = 8000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(exp.static(path.join(__dirname, 'views', 'public')));

app.use(
    exp.urlencoded({
        extended: true
    })
)
app.use(exp.json())
app.use(session({
    secret: 'chavi',
    resave: false,
    saveUninitialized: false
}))
function verifica_user(req, res, next) {
    if (!req.session.conta) {
        return res.redirect('/login');
    }
    next();
}
///criando a partial
const partial = hbs.create({
    partialsDir: ['views/partials']
})

//setando handlebars como engine do express
app.engine('handlebars', partial.engine)
app.set('view engine', 'handlebars')

//cadastro
app.get('/cadastro', userController.cadastroGET)
app.post('/cadastro', userController.cadastroPOST)

//login
app.get('/login', userController.loginGET)
app.post('/login', userController.loginPOST)

//rotas da conta

//rotas pra transferencia
app.get('/transferencia', contaController.transferGET)
app.post('/transferencia', contaController.transferPOST)

app.get('/verificar', contaController.verificarCPF_GET)
app.post('/verificar', contaController.verificarCPF_POST)

//rotas para depósito
app.get('/deposito', contaController.depositoGET)
app.post('/deposito', contaController.depositoPOST)

//rotas para saque
app.get('/saque', contaController.saqueGET)
app.post('/saque', contaController.saquePOST)

//por fim, rota para fatura/historico
app.get('/fatura', contaController.faturaGET)

//obrigado, para quem está lendo este apenas um show :)

//home
app.get('/', verifica_user, userController.home)

app.listen(porta, ()=>{
    console.log(chalk.bgMagenta(`Servidor rodando na porta: ${porta}`))
})