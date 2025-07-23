const minimist = require('minimist')

//modulo externo
const argumentos = minimist(process.argv.slice(2))

//modulo interno
const soma = require('./soma').soma
const numero1 = argumentos['numero1']
const numero2 = argumentos['numero2']

soma(numero1,numero2)