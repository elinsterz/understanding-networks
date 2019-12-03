/*
   REST Test
   A minimal server to test a RESTful API.
   Modify to match your API. 
   The RESTful API in this case is for a networked thermostat. 
   The endpoints are:
   /temperature  - temperature in degrees C, a float
   /setpoint     - the temperature setpoint
   /status       - heat, cool, or fan
   /motion       - last time a motion sensor on the thermostat was triggered
   /datetime     - the current date and time
   You can GET the value of any of the endpoints, or 
   you can POST to them. 
*/

const SerialPort = require('serialport'); // include the serialport library
const Readline = require('@serialport/parser-readline');
var portName = '/dev/cu.usbmodem14301'; // get the port name from the command line
const myPort = new SerialPort(portName); // open the port
const parser = new Readline(); // make a new parser to read ASCII lines
myPort.pipe(parser); // pipe the serial stream to the parser

myPort.on('open', openPort); // called when the serial port opens
myPort.on('close', closePort); // called when the serial port closes
myPort.on('error', serialError); // called when there's an error with the serial port
parser.on('data', listen); // called when there's new data incoming

let express = require('express'); // include the express library
let server = express(); // create a server using express
let bodyParser = require('body-parser'); // include body-parser
server.use('/', express.static('public')); // serve static files from /public

app = express();
app.use(bodyParser.json()); 

// get the time:
// let now = new Date();

// make a data object representing all your parameters:
let mouse = {
    mouse_x: 20.5, // temperature in degrees C, a float
    mouse_y: 22, // the temperature setpoint
    state: false, // heat, cool, or fan
    click: false
}

let mouseArr = [];
app.post('/curr_mouse', function(req, res) {
    var curr_mouse = req.body;
    console.log(curr_mouse);
    mouseArr.push(curr_mouse);
    res.send("Mouse position added!");
});

// you need a couple of parsers for the body of a POST request:
server.use(bodyParser.json()); // for  application/json
server.use(bodyParser.urlencoded({
    extended: true
})); // for application/x-www-form-urlencoded

function openPort() {
    console.log('port open');
}

function listen(data) {
    console.log("I am listening!!!");
    console.log(data);
}

function closePort() {
    console.log('port closed');
}

function serialError(error) {
    console.log('there was an error with the serial port: ' + error);
    myPort.close();
}

// this handles all GET requests. You may want to make
// separate functions for each API endpoint instead:
function handleGetRequest(request, response) {
    // print out the info from the request:
    printRequestInfo(request);
    let result = '';
    // find out the REST API path, and get the appropriate property:
    switch (request.path) {
        case '/mouse_x':
            result = mouse.mouse_x;
            console.log(result);
            break;
        case '/mouse_y':
            result = mouse.mouse_y;
            break;
    }
    response.end(result.toString());
}

function runRemoteCommand(request, response) {
    sendSerialData(request.params.command);
    response.end('sent your command');
}

///PART TO WRITE MOUSE POSITION TO SERVER
function getMouseState(request, response) {
    let result = {};
    // query the serial port for the mouse position
    result.mouse_x = mouse.mouse_x;
    result.mouse_y = mouse.mouse_y;
    response.json(result);
}

// this handlles all POST requests. You may want to make
// separate functions for each API endpoint instead.
// NOTE: This does NOT check that your parameter values are valid. You should do that.

function handlePostRequest(request, response) {
    printRequestInfo(request);
    let result = '';
    // iterate over the properties in request.params:
    for (property in request.params) {
        // set the thermostat item with the same name as the
        // param that's set in request.params:
        mouse[property] = request.params[property];
        // save the result so you can reply to the client:
        result = request.params[property];
    }
    response.end(result.toString());
}

function moveMouse(request, response) {
    // request is /mouse/:mouse_x/:mouse_y'

    // get the position from the request
    //SM,1000,-250,766\r
    let result = 'SM,' + '1000,' + request.params.mouse_x + "," + request.params.mouse_y;

    // send it to the serial port as a command
    sendSerialData(result);

    // wait for confirmation from the serial port  
    // send a response back to the user
    response.send(result); //send for string

}

// function sendData() {
//     // if myPort.isOpen() {
//     // convert the value to an ASCII string before sending it:
//     myPort.write(result);
//     console.log("Sending something out the serial port");
//     // }
// }


// this pulls put elements of the request which you may want:
function printRequestInfo(request) {
    // the IP address of the client, the request method, and the path:
    console.log('Client IP address: ' + request.ip);
    console.log('Request method: ' + request.method);
    // the path is the API endpoint:
    console.log('Request path: ' + request.path);

    // if it's a POST request, you might want the params or
    // the body:
    if (request.method === 'POST') {
        console.log('Request parameters: ');
        console.log(request.params);
        console.log('Request body: ');
        console.log(request.body);
    }
    // If it's a GET, you can only query. It's not
    // very RESTful, but here's how you do it:
    if (request.method === 'GET') {
        console.log('Request Query: ');
        console.log(request.query);
    }
}
/////////////////////////////////

function sendSerialData(command) {
    // if myPort.isOpen() {
    console.log(command + '\r');
    // convert the value to an ASCII string before sending it:
    // myPort.write(command);
    // myPort.write('SM,1000,-250,766\r');

    //wait for data to come back
    // while (newData == false) {
    myPort.write(command + '\r');
    console.log("Sending something out the serial port");
    // }

    // }
    console.log("Sending something out the serial port");


}
////////////////////////////////

// here are all your endpoints. The pattern is:
// GET the  current value, or
// POST the new value as a request param:
server.get('/mouse', getMouseState);
server.get('/command/:command', runRemoteCommand);
server.post('/mouse/:mouse_x/:mouse_y', moveMouse);
server.post('/mouse/:mouse_y', handlePostRequest);
server.get('/state', handleGetRequest);
server.post('/state/:state', handlePostRequest);

server.listen(8080); // start the server