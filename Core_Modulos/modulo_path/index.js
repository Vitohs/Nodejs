const path = require('path')
const caminho = '/vivi/livros/vhChefe.pdf'

console.log(`diretorios que precisamos passar para achar o arquivo : ${path.dirname(caminho)}`)
console.log(`nome do arquivo que queremos : ${path.basename(caminho)}}`)
console.log(`o tipo de arquivo : ${path.extname(caminho)}`)