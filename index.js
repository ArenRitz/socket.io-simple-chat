const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: { origin: "*" }}) // require socket.io and allow cross-origin requests from any origin
app.set('view engine', 'ejs');

app.get('/', (req, res) => { // get route for home page
  res.render('home.ejs');
  })

  server.listen(3000, () => {
    console.log('listening on port 3000');
  });

  io.on('connection', (socket) => { // listen for connection event
    console.log("User connected:", socket.id) // log connection id

    socket.on("message", (data) => {
      io.sockets.emit("message", data) // emit message to all clients
      //socket.broadcast.emit("message", data) // emit message to all clients except sender
    })
  });