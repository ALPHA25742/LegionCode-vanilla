//v1 const express = require('express');
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

const e = require('express');

// const messages = [];

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Send existing messages to the newly connected user
//   socket.emit('init', messages);

//   socket.on('chat message', (message) => {
//     messages.push(message);

//     // Broadcast the new message to all connected users
//     io.emit('chat message', message);
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// http.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// v2,v3 server.js
// const express = require('express');
// const app = express();
// or const app = require('express')();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('sendMessage', (message) => {
//     io.emit('message', message);
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// const port = 5000;
// http.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const{instrument}=require('@socket.io/admin-ui')

const  io = require('socket.io')(3000,{
    cors:{
        origin:"*"
        // origin:["http://127.0.0.1:5173","https://admin.socket.io"]
    }
})

const userio = io.of('/user')
userio.use((socket,next)=>{
    if(socket.handshake.auth.token){
        //use the token however you want
        next()
    }else{
        next(new Error("invalid token"))
    }
})

userio.on('connection', socket => {
   console.log("connected as user")
})

io.on('connection', socket => {
    // console.log(socket.id)
    socket.on('send-message', (message,room) => { 
        // io.emit('recieved-message', message); emitting custom event to all connected clients
        if(room===''){
        socket.broadcast.emit('recieved-message', message);//emitting to all connected clients except the sender
        }else{
            socket.to(room).emit('recieved-message', message);//emitting to all connected clients except the sender in room
        }
    })//listening for custom event
    socket.on('join-room', (room, cb) => {
        socket.join(room);
        cb(`Joined ${room}`);
    })
})

instrument(io,{auth:false})