const express =require("express");
const app =express();
const path = require("path");
const socketio=require("socket.io");
const cors = require('cors');



app.use(cors({
  origin : "*"
}));

const server = app.listen(8080,()=>{
  console.log("서버열림")
});

const io=socketio(server,{
  cors: {
    origin: '*',
    credentials: true
  }
});
// console.log(io)
let userid=[];
let usercount=0;
let nickname="dd";

io.on('connection', (socket) => {

  usercount++;
  console.log(socket.id,' user connected');
  io.emit('connectuser',socket.id);
  userid.push({userid:socket.id,
    primarykey: usercount,
    _nickname:nickname
  });
  console.log("유저아이디임",userid);
  socket.on('chat message', (msg) => {
    console.log('Received message:', msg);
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });
  io.emit('nowusers',userid);
  socket.on('disconnect', () => {
    userid = userid.filter(user => user.userid !== socket.id);
    console.log(socket.id,' user disconnected');
    console.log(userid);
    io.emit('nowusers',userid);
    io.emit('disconnectuser',socket.id);
  });
  // 귓속말 보내는 socket
  socket.on('whisper',({message,receiverId})=>{
    // let receiver=false;
    // for(let i=0;i<userid.length;i++){
    //   if(userid[i]==receiverId)
    //   {
    //     console.log(receiverId);
    //     receiver=true
    //   }
    // }
    // if(receiver){
    //   io.emit('whisper',{message,senderid:socket.id});
    // }
    io.to(receiverId).emit('whisper',message);
  })
});