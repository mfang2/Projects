const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const configRoutes = require("./routes");
const logger = require('morgan');
var cors = require('cors')


const app = express();
app.use(cors())

app.use(logger('dev'))

app.use(bodyParser.json());
app.use(cookieParser());


configRoutes(app);
app.listen(3001, () => {
    console.log("We've now got a server!");
    console.log("Event.it routes will be running on http://localhost:3001");
  });


var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3002, function(){
  console.log('listening on *:3002');
});
