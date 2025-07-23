const eventEmitter = require('events')
const evento = new eventEmitter()

evento.on('bankai', ()=>{
    console.log('zanka no tachi')
})

console.log('shikai: ryujin jaka')

evento.emit('bankai')

console.log('yhachw fumado')