'use strict'

const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connect', (socket) => {
  socket.on('new-message', (msg) => {
    io.emit('receive-message', msg)
  })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

// serve static files with express
app.use(express.static('./public'))

server.listen(port, () => {
  console.log('server listening')
})
