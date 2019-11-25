// Steps from Code and Coffee

//client side needs:
//1. resize the canvas to users screen
//2. connect to the server and raw lines for the "drawLine" messages
//3. on click the client should send a "drawLine" message to the server when we are moving the mouse.


document.addEventListener("DOMContentLoaded", function() {
    var mouse = { 
       click: false,
       move: false,
       pos: {x:0, y:0},
       pos_prev: false
    };
    // get canvas element and create context
    var canvas  = document.getElementById('drawing');
    var context = canvas.getContext('2d');
    var width   = window.innerWidth;
    var height  = window.innerHeight;
    var socket  = io.connect();
 
    // set canvas to full browser width/height
    canvas.width = width;
    canvas.height = height;
 
    // register mouse event handlers
    canvas.onmousedown = function(e){ mouse.click = true; };
    canvas.onmouseup = function(e){ mouse.click = false; };
 
    canvas.onmousemove = function(e) {
       // normalize mouse position to range 0.0 - 1.0
       mouse.pos.x = e.clientX / width;
       mouse.pos.y = e.clientY / height;
       console.log('mouse position x: '+ mouse.pos.x);
       console.log('mouse position y: '+ mouse.pos.y);
       mouse.move = true;
    };
 
    // draw line received from server
     socket.on('drawLine', function (data) {
       var line = data.line;
       context.beginPath();
       context.moveTo(line[0].x * width, line[0].y * height);
       context.lineTo(line[1].x * width, line[1].y * height);
       context.lineWidth = 5;
       context.lineCap = 'round';
       context.stroke();
    });
    
    // main loop, running every 25ms
    function mainLoop() {
       // check if the user is drawing
       if (mouse.click && mouse.move && mouse.pos_prev) {
          // send line to to the server
          socket.emit('drawLine', { 
              line: [ mouse.pos, mouse.pos_prev ] 
            });
          mouse.move = false;
       }
       mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
       setTimeout(mainLoop, 5);
    }
    mainLoop();
 });




/*
document.addEventListener("load", init);


function init() {

    //declare mouse object with prop
    let mouse = {
        click: false,
        move: false,
        pos: { x: 0, y: 0 },
        pos_prev: false
    };

    //get canvas element for 2d drawing
    let canvas = document.getElementById("drawing");
    let context = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let socket = io.connect();

    //sets up canvas width and heigh to browser width and height
    canvas.width = width;
    canvas.height = height;

    canvas.onmousedown = function (e) {
        mouse.click = true;
    };

    canvas.onmouseup = function (e) {
        mouse.click = false;
    };

    //mouse.pos fields .x/.y will be updated everytime we move the mouse. this is for the mouse position normalization
    //mouse.move to see if the mouse was moved at all
    canvas.onmousemove = function (e) {
        mouse.pos.x = e.clientX / width;
        mouse.pos.y = e.clientY / height;
        mouse.move = true;
    }

    //listen for the "drawLine message" from the server
    socket.on('drawLine', function (data) {
        //draw line
        let line = data.line;
        context.beginPath();
        context.moveTo(line[0].x * width, line[0].y * height);
        context.lineTo(line[1].x * width, line[1].y * height);
        context.stroke();
    });

    // main loop, running every 25ms
    function mainLoop() {
        // check if the user is drawing
        if (mouse.click && mouse.move && mouse.pos_prev) {
            // send line to to the server
            socket.emit('draw_line', { 
                line: [mouse.pos, mouse.pos_prev] 
            });
            mouse.move = false;
        }
        mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };
        setTimeout(mainLoop, 25);
    }
    mainLoop();
};

*/