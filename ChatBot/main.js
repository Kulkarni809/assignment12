const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
server.listen(process.env.PORT||5001,console.log('server started ...'));
app.use(express.static('public'));
const onlineUsers = [];
var re1 = 'Hi'; 
var re2 = 'Hey'; 
var re3 = 'hi'; 
var re4 = 'hey';
io.sockets.on('connection',(socket)=>{
    onlineUsers.push(socket);
    console.log('Online Users = ',onlineUsers.length);
    socket.on('sendMsg',(req)=>{
        if(req.includes(re1)||req.includes(re2)||req.includes(re3)||req.includes(re4)){
            io.sockets.emit('newMsg',{
                msg:'I can help you with queries.'
            });
        }else{
            io.sockets.emit('searchApi',{
                msg:req
            });
        };
    });
    socket.on('disconnect',(socket)=>{
        onlineUsers.splice(onlineUsers.indexOf(socket),1);
        console.log('userRemaining = ',onlineUsers.length);
    })
});