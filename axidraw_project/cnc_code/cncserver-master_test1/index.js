const SerialPort = require('serialport');			// include the serialport library
const Readline = require('@serialport/parser-readline');
var	portName =  '/dev/cu.usbmodem14301';						// get the port name from the command line
const myPort = new SerialPort(portName, );		// open the port
const parser = new Readline();				    // make a new parser to read ASCII lines
myPort.pipe(parser);							// pipe the serial stream to the parser

myPort.on('open', openPort);		// called when the serial port opens
myPort.on('close', closePort);		// called when the serial port closes
myPort.on('error', serialError);	// called when there's an error with the serial port
parser.on('data', listen);			// called when there's new data incoming

function openPort() {
	console.log('port open');

	// since you only send data when the port is open, this function
	// is local to the openPort() function:
	function sendData() {
		// convert the value to an ASCII string before sending it:
        myPort.write('HM,10000\r');
		console.log("Sending something out the serial port");
		
	}
	// set an interval to update the brightness 2 times per second:
	setInterval(sendData, 2000);
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