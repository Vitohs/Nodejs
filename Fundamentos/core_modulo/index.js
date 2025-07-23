const path = require("path")
const fs = require("fs").promises
const analisei = fs.readFile

async function Ler() {
  try {
    const extensions = path.extname("vv.txt")
    const conteudo = await analisei("vv.txt", "utf8")
    console.log(
      "o arquivo possui a extensão: ", extensions, " conteudo da carta: ", conteudo
    )
  } catch (erro) {
    console.log("Erro: ", erro)
  }
}

Ler();
