var cnv;
var x = 150;
var y = 150;

function setup() {
    cnv = createCanvas(400, 600);
    // Move the canvas so it’s inside our <div id="sketch-holder">.
    cnv.parent('sketch-holder');
    // fill(255, 0, 0);
    noStroke();
    ellipse(x, y, 20, 20);
}

function windowResized() {
    centerCanvas();
}

var clicks = 1;
function moveTopLeft() {
    ellipse(x, y, 20, 20);
    x = x - 10;
    y = y - 10;
    clicks += 1;
    console.log(clicks);
    // stroke(126);
    // strokeWeight(3);
    // line(x, y, x - clicks * 10, y - clicks * 10);
}

function moveTop() {
    ellipse(x, y, 20, 20);
    y = y - 10;
    clicks += 1;
    // stroke(126);
    // strokeWeight(3);
    // line(x, y, x, y - clicks * 10);
}

function moveTopRight() {
    ellipse(x, y, 20, 20);
    x = x + 10;
    y = y - 10;
}

function moveButtomLeft() {
    ellipse(x, y, 20, 20);
    x = x - 10;
    y = y + 10;
}

function moveButtom() {
    ellipse(x, y, 20, 20);
    y = y + 10;
}

function moveButtomRight() {
    ellipse(x, y, 20, 20);
    x = x + 10;
    y = y + 10;
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