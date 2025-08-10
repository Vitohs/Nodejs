import express from "express"

const app = express()
const port = 2217

//verbo get
//passamos a rota e depois uma função anonima, onde trabalhamos com request e response
app.get('/', (req,res)=>{
    res.send('Palmeiras não tem mundialkkj')
})

app.get('/vito', (req,res)=>{
    res.send('yhachw')
})

app.listen(port, ()=>{
    console.log(`servidor sendo iniciado na porta: ${port}`)
})