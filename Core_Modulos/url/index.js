const url = require('url')
const address = "https://www.vvChefe.com.br/armas?produtos=glockPentaoExtendido"
const parseUrl = new url.URL(address)

console.log(`Dominio do site: ${parseUrl.host}`)//retorna o dominio
console.log(`Usuario está na view de: ${parseUrl.pathname}`)
console.log(`Usuario fez uma busca por: ${parseUrl.search}`)
console.log(`Parametro de pesquisa dele foi de: ${parseUrl.searchParams}`)
console.log(`Ele queria o produto: ${parseUrl.searchParams.get('produtos')}`)