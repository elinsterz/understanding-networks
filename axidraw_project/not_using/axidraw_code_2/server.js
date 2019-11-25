/*
/*
Express-based webSocket Server
context: node.js
*/

// Include libraries:
var express = require('express');           // the express library
var http = require("http");                 // the http library
var WebSocketServer = require('ws').Server; // ws library's Server class

var server = express();                     // the express server
var httpServer = http.createServer(server); // the http server
var wss = new WebSocketServer({ server: httpServer }); // websocket server


// serve static files from /public:
server.use('/', express.static('public'));

// start the server:
httpServer.listen(8080);                    // listen for http connections
wss.on('connection', connectClient);    // listen for webSocket messages

// serve static files from /public:
server.use('/', express.static('public'));

function connectClient(newClient) {
    //websocket is connected 
    console.log('new client: ' + newClient);

    //if there is a websocket error:
    function readError(error) {
        console.log(error);
    }

    //when a client disconnects from a web socket:
    function readError(error) {
        console.log(error);
    }

    // when a client disconnects from a webSocket:
    function disconnect() {
        console.log('Client ' + newClient.clientName + ' disconnected');
    }

    // set up event listeners:
    // newClient.on('message', readMessage);
    newClient.on('error', readError);
    newClient.on('close', disconnect);

    // // when a new client connects, send the greeting message:
    // var greeting = { "client": wss.clients.size };
    // newClient.send(JSON.stringify(greeting));

}



/*DUMPSTER CODE */
    // // when a webSocket message comes in from this client:
    // function readMessage(data) {
    //     var result = JSON.parse(data);              // parse the JSON
    //     if (result.hasOwnProperty('clientName')) {  // if there's a clientName,
    //         newClient.clientName = result.clientName; // name the client
    //     }
    //     // if (result.hasOwnProperty('playing') ||      // if there's a playing prop
    //     //     result.hasOwnProperty('position')) {      // or a position property
    //     //     broadcast(newClient, result);             // broadcast it    
    //     // }
    //     if (result.exit === 1) {                    // if it's an exit message,
    //         console.log("client " + result.clientName + " logging out");
    //         newClient.close();                        // close the webSocket
    //     }
    //     console.log(result);                        // print the message itself
    // }