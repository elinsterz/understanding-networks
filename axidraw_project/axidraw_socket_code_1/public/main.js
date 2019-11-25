// Steps from Code and Coffee

//client side needs:
//1. resize the canvas to users screen
//2. connect to the server and raw lines for the "drawLine" messages
//3. on click the client should send a "drawLine" message to the server when we are moving the mouse.

// client side code
var socket = io.connect();
socket.emit('create', 'room1');

document.addEventListener("DOMContentLoaded", function () {
   var mouse = {
      click: false,
      move: false,
      pos: { x: 0, y: 0 },
      pos_prev: false
   };
   // get canvas element and create context
   var canvas = document.getElementById('drawing');
   var context = canvas.getContext('2d');
   var width = window.innerWidth;
   var height = window.innerHeight;
   var socket = io.connect();

   // set canvas to full browser width/height
   canvas.width = width;
   canvas.height = height;

   // register mouse event handlers
   canvas.onmousedown = function (e) { mouse.click = true; };
   canvas.onmouseup = function (e) { mouse.click = false; };

   canvas.onmousemove = function (e) {
      // normalize mouse position to range 0.0 - 1.0
      mouse.pos.x = e.clientX / width;
      mouse.pos.y = e.clientY / height;
      console.log('mouse position x: ' + mouse.pos.x);
      console.log('mouse position y: ' + mouse.pos.y);
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
            line: [mouse.pos, mouse.pos_prev]
         });
         mouse.move = false;
      }
      mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };
      setTimeout(mainLoop, 5);
   }
   mainLoop();

   let startButton = document.getElementById('start-button');
   startButton.addEventListener('click', clock);

   let myTimer;
   function clock() {
      console.log('start button is clicked!');

      myTimer = setInterval(myClock, 1000);
      let seconds = 30;

      function myClock() {
         document.getElementById("timerDisplay").innerHTML = --seconds;
         if (seconds == 0) {
            clearInterval(myTimer);
            alert("Reached zero");
         }
      }
   }


});




/////////* DUMPSTER *////////

// /////////* TIMER */////////
// //set minutes
// let mins = 2;

// //calculate the seconds
// let sec = mins * 60;

// //countdown function is evoked when page is loaded
// function countdown(){
//    setTimeout('decreaseTime()', 60);
// }

// //decrement function 
// function decreaseTime(){
//    if(document.getElementById){
//       minutes = document.getElementById("minutes");
//       seconds = document.getElementById("seconds");

//       //if less than a minute remaining
//       //display only seconds value
//       if(seconds < 59){
//          seconds.value = secs;
//       }

//       //display both min and sec
//       //get min and get sec is used to get min and sec
//       else {
//          minutes.value = getminutes();
//          seconds.value = getseconds();
//       }

//       //when less than a min remains
//       //color of the minutes and seconds changes 
//       if(min < 1){
//          minutes.style.color = "red";
//          seconds.style.color = "red";
//       }
//       //if seconds > 0 then seconds is decremented
//       else {
//          secs--;
//          setTimeout('decreaseTime()', 1000);
//       }
//    }
// }

// function getminutes(){
//    //min is seconds divided by 60, rounded down
//    mins = Math.floor(secs/60);
//    return mins;
// }

// function getseconds(){
//    //take min remaining (as seconds)
//    //from total seconds remaining
//    return secs - Math.round(mins*60);
// }