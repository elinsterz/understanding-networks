var cnv;
var x = 150;
var y = 150;
var socket;

socket.on('connect', function(){
    console.log("connected");
});

function setup() {
    cnv = createCanvas(400, 600);
    // Move the canvas so it’s inside our <div id="sketch-holder">.
    cnv.parent('sketch-holder');
    // fill(255, 0, 0);
    noStroke();
    ellipse(x, y, 20, 20);

    ///SOCKET P5JS PORTION///////
    // Start a socket connection to the server
    // Some day we would run this server somewhere else
    socket = io.connect('http://localhost:8080');
    // We make a named event called 'mouse' and write an
    // anonymous callback function
    // socket.on ('mouse', drawEllipse);

    socket.on('mouseServerToClient',
        // When we receive data
        function (data) {
            console.log("Got: " + data.x + " " + data.y);
            // Draw a yellow circle
            fill(255,255,0);
            noStroke();
            ellipse(data.x, data.y, 20, 20);
        }
    );
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
    // We are sending!
    console.log("sendmouse: " + xpos + " " + ypos);

    // Make a little object with x and y
    var data = {
        x: xpos,
        y: ypos
    };

    // Send that object to the socket
    socket.emit('mouse', data);
}


var clicks = 1;
function moveTopLeft() {
    ellipse(x, y, 20, 20);
    x = x - 10;
    y = y - 10;
    clicks += 1;
    console.log(clicks);

    //sendMouse will send data to server
    sendmouse(x, y);

    // stroke(126);
    // strokeWeight(3);
    // line(x, y, x - clicks * 10, y - clicks * 10);
}

function moveTop() {
    ellipse(x, y, 20, 20);
    y = y - 10;
    clicks += 1;

    //sendMouse will send data to server
    sendmouse(x, y);

    // stroke(126);
    // strokeWeight(3);
    // line(x, y, x, y - clicks * 10);
}

function moveTopRight() {
    ellipse(x, y, 20, 20);
    x = x + 10;
    y = y - 10;

    //sendMouse will send data to server
    sendmouse(x, y);
}

function moveButtomLeft() {
    ellipse(x, y, 20, 20);
    x = x - 10;
    y = y + 10;

    //sendMouse will send data to server
    sendmouse(x, y);

}

function moveButtom() {
    ellipse(x, y, 20, 20);
    y = y + 10;

    //sendMouse will send data to server
    sendmouse(x, y);

}

function moveButtomRight() {
    ellipse(x, y, 20, 20);
    x = x + 10;
    y = y + 10;

    //sendMouse will send data to server
    sendmouse(x, y);
}


let topLeftBtn = document.getElementById('topleft');
if (topLeftBtn.onclick) {
    console.log("clicking")
}

function setMouse(x, y) {
    var path = '/mouse/' + x + '/' + y; // assemble the full URL
    var content = '';
    console.log('path: ' + path);
    //httpDo( path, 'GET', content, 'text', getResponse); //HTTP PUT the change
    httpDo(path, 'POST', content, 'text', responseHandler); //HTTP PUT the change
}

function responseHandler(result) {
    console.log(result);
}