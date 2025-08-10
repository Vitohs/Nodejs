//vendo esse modulo
import _ from "lodash"
import chalk from "chalk"
const a = [1,2,3,4,5,6]
const b = [21,2,3,33,22]
//achando a diferença entre a e b
const diff = _.difference(a,b)

console.log(`A diferença entre a e b são os numeros: ${chalk.blue.bold(diff)}`)