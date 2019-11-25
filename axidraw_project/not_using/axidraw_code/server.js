let express = require('express');	         // include the express library
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);				         // create a server using express
let bodyParser = require('body-parser');	   // include body-parser

server.listen(8080);             // start the server

app.use('/', express.static('public'));   // app static files from /public

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});


//make a data object for parameters

let position = {
    'mouseX': 0,
    'mouseY': 0,
    'state': 1
}

//handle GET requests
app.get("/position", function(request,response){
    io.emit('position', position);
})

//handle POST requests
app.post("/", function(request, response){

})


// GET /drawingConnection

// 200  OK, Connect to web socket
// 500  Error, Don't open web socket

// var clientAlreadyConnected = false;
// if clientAlreadyConnected then ok