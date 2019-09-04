const express = require('express');
const app = express();
const server = require('http').createServer(app);
server.listen(process.env.PORT||5000,console.log('server started ...'));
app.use(express.static('public'));