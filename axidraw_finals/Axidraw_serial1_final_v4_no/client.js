document.addEventListener("DOMContentLoaded", function () {
    var mouse = {
        click: false,
        state: false,
        // pos:{x:0, y:0},
        mouse_x: 0,
        mouse_y: 0,
        prev_mouseX: 0,
        prev_mouseY: 0
        // pos_prev: false
    }

// get canvas element and create context
var canvas = document.getElementById('drawing');
var context = canvas.getContext('2d');
var width = window.innerWidth;
var height = window.innerHeight;

console.log(canvas);
// set canvas to full browser width/height
canvas.width = width;
canvas.height = height;

// register mouse event handlers
canvas.onmousedown = function (e) {
    mouse.click = true;
};
canvas.onmouseup = function (e) {
    mouse.click = false;
};

canvas.onmousemove = function (e) {
    // normalize mouse position to range 0.0 - 1.0
    mouse.mouse_x = e.clientX / width;
    mouse.mouse_y = e.clientY / height;
    // mouse.pos.x = e.clientX / width;
    // mouse.pos.y = e.clientY / height;
    console.log('mouse position x: ' + mouse.mouse_x);
    console.log('mouse position y: ' + mouse.mouse_y);
    mouse.move = true;
};


// main loop, running every 25ms
function mainLoop() {
    // check if the user is drawing
    // if (mouse.click && mouse.move && mouse.pos_prev) {
    if (mouse.move) {
        // var line = [];
        mouse.mouse_x = e.clientX / width;
        mouse.mouse_y = e.clientY / height;
        // mouse.prev_mouseX = 
        // mouse.prev_mouseY = 
        console.log('mouse position x: ' + mouse.mouse_x);
        console.log('mouse position y: ' + mouse.mouse_y);

        context.beginPath();
        context.moveTo(mouse.prev_mouseX, mouse.prev_mouseY);
        context.lineTo(mouse.mouse_x, mouse.mouse_y);
        context.stroke();
        context.lineWidth = 5;
        context.lineCap = 'round';
        context.closePath();
        [mouse.prev_mouseX, mouse.prev_mouseY] = [mouse.mouse_x, mouse.mouse_y];
        // context.moveTo(line[0].x * width, line[0].y * height);
        // context.lineTo(line[1].x * width, line[1].y * height);
        // context.lineWidth = 5;
        // context.lineCap = 'round';
        // context.stroke();
    }
    mouse.move = false;
    mouse.pos_prev = { x: mouse.mouse_x, y: mouse.mouse_y};
    // setTimeout(mainLoop, 5);
 }
//  mainLoop();
 canvas.addEventListener('mousemove', mainLoop);
});
