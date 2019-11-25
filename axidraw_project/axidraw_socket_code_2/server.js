const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3006;

app.use(express.static(__dirname + '/public'));

// function onConnection(socket) {
//     socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
// }

// io.on('connection', onConnection);

var io = io.listen(server);
var buffer = [];

io.on('connection', function (client) {

    client.send({ buffer: buffer });
    client.broadcast.send({ announcement: client.sessionId + ' connected' });

    chatGuests.push(client);

    client.on('message', function (message) {
        var msg = { message: [client.sessionId, message] };
        buffer.push(msg);
        if (buffer.length > 15) buffer.shift();
        client.broadcast.send(msg);
    });

    client.on('disconnect', function () {
        client.broadcast.send({ announcement: client.sessionId + ' disconnected' });
    });

    //array of all lines drawn
    let lineHistory = [];

    //first send the history to the new client
    for (let i in lineHistory) {
        client.emit('drawLine', {
            line: lineHistory[i]
        });
    }
    //add handler for message type "drawLine"
    client.on('drawLine', function (data) {
        //add received line to history
        lineHistory.push(data.line);

        //send line to all clients
        io.emit('drawLine', {
            line: data.line
        });
    });
}



http.listen(port, () => console.log('listening on port ' + port));



        // // server side code
    // io.sockets.on('connection', function (socket) {
    //     socket.on('create', function (room) {
    //         socket.join(room);
    //         console.log('room created');
    //     });
    // });

    // //event handler for new incoming connections
    // io.on('connection', function (socket) {

    //     //first send the history to the new client
    //     for (let i in lineHistory) {
    //         socket.emit('drawLine', {
    //             line: lineHistory[i]
    //         });
    //     }
    //     //add handler for message type "drawLine"
    //     socket.on('drawLine', function (data) {
    //         //add received line to history
    //         lineHistory.push(data.line);

    //         //send line to all clients
    //         io.emit('drawLine', {
    //             line: data.line
    //         });
    //     });
    // });