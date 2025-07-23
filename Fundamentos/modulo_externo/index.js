const minimist = require("minimist")

const args = minimist(process.argv.slice(2))

const nome = args['nome']
const altura = args['altura']

console.log(`meu nome é ${nome} e tenho ${altura}cm de altura`)