"use strict";

/**
 * @file Abstraction module for all Socket I/O related code for CNC Server!
 *
 */

module.exports = function (cncserver) {
    // Central Socket.io object for streaming state data
    var io = require('socket.io')(cncserver.server);
    cncserver.io = {};

    // Get the array of rooms
    let rooms = io.sockets.adapter.rooms;
    let roomNum = 0;
    // How many in a group? Default is 2
    let NUM_PARTNERS = 2;

    // let connectionsLimit = 2;

    // SOCKET DATA STREAM ========================================================
    io.on('connection', function (socket) {
      console.log('An input client connected: ' + socket.id);

      // Join a room
      joinRoom(socket);

      //listen for username from client
      socket.on('username', function (senderUsername) {

        let room = socket.room;
        let data = senderUsername;
        // console.log(data);
        let member;
        let members = rooms[room].sockets;
        console.log("members: " + members);
        let sender = socket.id;
        // console.log('sender: ' + sender);
        let receiver;
        for (member in members) {
          if (member != sender) {
            receiver = member;
            // console.log('receiver: ' + receiver);
          }
        }

        // socket.to(room).emit('connectedUsername', data);
        socket.broadcast.to(receiver).emit('connectedUsername', data);
      });

      // Listen for data messages
      socket.on('text', function (data) {
        // Data comes in as whatever was sent, including objects
        //console.log("Received: 'message' " + data);
        // Which private room does this client belong to?
        let room = socket.room;

        // Share data to all members of room
        socket.to(room).emit('text', data);
      });

      // Listen for this client to disconnect
      // Tell partners this client disconnected
      socket.on('disconnect', function () {
        console.log("Client has disconnected " + socket.id);

        // Which room was this client in?
        let room = socket.room;
        // Tell others in room client has left
        if (rooms[room]) {
          socket.to(room).emit('leave room');
        }
      });

      // Send buffer and pen updates on user connect
      cncserver.io.sendPenUpdate();

      // TODO: this likely needs to be sent ONLY to new connections
      cncserver.io.sendBufferComplete();

      // socket.on('disconnect', function () {
      //   //console.log('user disconnected');
      // });

      // Shortcuts for moving and height for streaming lots of commands.
      socket.on('move', cncserver.io.shortcut.move);
      socket.on('height', cncserver.io.shortcut.height);
    });

    // Join room
    function joinRoom(socket) {
      // First, add client to incomplete rooms
      for (let r in rooms) {
        let room = rooms[r];
        if (room.isPrivate) {
          if (room.length < NUM_PARTNERS) {
            addSocketToRoom(socket, r);
            return;
          }
        }
      }

      // If there are no incomplete rooms, create new room and join it
      addSocketToRoom(socket, roomNum);
      roomNum++;
    }

    // Add client to room and record which room it was added to
    function addSocketToRoom(socket, r) {
      socket.join(r);
      rooms[r].isPrivate = true;
      socket.room = r;
      console.log(rooms);
    }

    // function keyPressedUser(e) {
    //   // console.log(e);
    //   if (e.keyCode == 13) {
    //     console.log('my username: ' + username.value);
    //     let myUsername = username.value;
    //     socket.emit('username', myUsername);
    //     // inputText.style.visibility = "visible";
    //   }
    // }


      /**
       * Send an update to all Stream clients about the actualPen object.
       * Called whenever actualPen object has been changed, E.G.: right before
       * a serial command is run, or internal state changes.
       */
      cncserver.io.sendPenUpdate = function () {
        if (cncserver.exports.penUpdateTrigger) {
          cncserver.exports.penUpdateTrigger(cncserver.actualPen);
        }
        io.emit('pen update', cncserver.actualPen);
      };

      /**
       * Send an update to all stream clients when something is added to the buffer.
       * Includes only the item added to the buffer, expects the client to handle.
       */
      cncserver.io.sendBufferAdd = function (item, hash) {
        var data = {
          type: 'add',
          item: item,
          hash: hash
        };

        if (cncserver.exports.bufferUpdateTrigger) {
          cncserver.exports.bufferUpdateTrigger(data);
        }
        io.emit('buffer update', data);
      };


      /**
       * Send an update to all stream clients when something is removed from the
       * buffer. Assumes the client knows where to remove from.
       */
      cncserver.io.sendBufferRemove = function () {
        var data = {
          type: 'remove'
        };

        if (cncserver.exports.bufferUpdateTrigger) {
          cncserver.exports.bufferUpdateTrigger(data);
        }
        io.emit('buffer update', data);
      };

      /**
       * Send an update to all stream clients when something is added to the buffer.
       * Includes only the item added to the buffer, expects the client to handle.
       */
      cncserver.io.sendBufferVars = function () {
        var data = {
          type: 'vars',
          bufferRunning: cncserver.buffer.running,
          bufferPaused: cncserver.buffer.paused,
          bufferPausePen: cncserver.buffer.pausePen
        };

        if (cncserver.exports.bufferUpdateTrigger) {
          cncserver.exports.bufferUpdateTrigger(data);
        }
        io.emit('buffer update', data);
      };

      /**
       * Send an update to all stream clients about everything buffer related.
       * Called only during connection inits.
       */
      cncserver.io.sendBufferComplete = function () {
        var data = {
          type: 'complete',
          bufferList: cncserver.buffer.data,
          bufferData: cncserver.buffer.dataSet,
          bufferRunning: cncserver.buffer.running,
          bufferPaused: cncserver.buffer.paused,
          bufferPausePen: cncserver.buffer.pausePen
        };

        // Low-level event callback trigger to avoid Socket.io overhead
        if (cncserver.exports.bufferUpdateTrigger) {
          cncserver.exports.bufferUpdateTrigger(data);
        }
        io.emit('buffer update', data);
      };

      /**
       * Send an update to all stream clients of the given custom text string.
       *
       * @param {string} message
       *   Message to send out to all clients.
       */
      cncserver.io.sendMessageUpdate = function (message) {
        io.emit('message update', {
          message: message,
          timestamp: new Date().toString()
        });
      };

      /**
       * Send an update to all stream clients of a machine name callback event.
       *
       * @param {string} name
       *   Machine name of callback to send to clients
       */
      cncserver.io.sendCallbackUpdate = function (name) {
        io.emit('callback update', {
          name: name,
          timestamp: new Date().toString()
        });
      };

      /**
       * Trigger manual swap complete to all stream clients. Buffer will be paused.
       *
       * @param {int} vIndex
       *   Virtual index of manual swap
       */
      cncserver.io.manualSwapTrigger = function (vIndex) {
        io.emit('manualswap trigger', {
          index: vIndex
        });
      };

      // Shortcut functions for move/height streaming.
      cncserver.io.shortcut = {
        move: function (data) {
          data.ignoreTimeout = 1;
          cncserver.control.setPen(data, function () {
            if (data.returnData) io.emit('move', cncserver.pen);
          });
        },

        height: function (data) {
          cncserver.control.setPen({
              ignoreTimeout: 1,
              state: data.state
            },
            function () {
              if (data.returnData) io.emit('height', cncserver.pen);
            }
          );
        }
      };
    };



    ///////* NOT USING *////////
    // // event handler for new incoming connections
    // if(io.engine.clientsCount > connectionsLimit){
    //   socket.emit('stopconnection', {
    //     hello: "world"
    //   }); //emit message to client
    //   socket.disconnect();
    //   console.log('disconnected');
    //   return
    // }