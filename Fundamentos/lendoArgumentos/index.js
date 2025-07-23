// capturando argumentos na linha de comando
console.log(process.argv)
//no array process.argv, ele possui 3 slots, o primeiro (0) indica o cominho do node.exe
//o segundo, o caminho da pasta que está executando
//o terceiro (2) os argumentos fornecidos via prompt
//uso splice para deletar os dois primeiros elementos do array
const argumentos = process.argv.splice(2)

//aqui, eu to pegando o nome fornecido, eu primeiro vou no array que tem o nome e o valor
//acessando esse primeiro e unico elemento (0), eu dou split para explodir e separar o resultado, a partir do =
//entao o nome vira um array com 2 elementos, [nome,vitor]
//por conta disso, peço para ele retornar o nome, que está na posição 1 do array
const nome = argumentos[0].split("=")[1]
const idade = argumentos[1].split("=")[1]

console.log(`Meu nome é ${nome} e tenho ${idade} anos :)`)