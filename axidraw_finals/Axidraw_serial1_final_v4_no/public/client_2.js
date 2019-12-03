var clicks = 0;
var lastClick = [0, 0];

function setup() {
    let myButton1 = createButton('button');
    myButton1.mousePressed(setMouse(200,-400));

    // let myButton2 = createButton('button');
    // myButton2.mousePressed(setMouse(500,800));
}

// document.getElementById('canvas').addEventListener('click', drawLine, false);

// function getCursorPosition(e) {
//     var x;
//     var y;

//     if (e.pageX != undefined && e.pageY != undefined) {
//         x = e.pageX;
//         y = e.pageY;
//     } else {
//         x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//         y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//     }
//     return [x, y];
// }

// function drawLine(e) {
//     context = this.getContext('2d');

//     x = getCursorPosition(e)[0] - this.offsetLeft;
//     y = getCursorPosition(e)[1] - this.offsetTop;

//     if (clicks != 1) {
//         clicks++;
//     } else {
//         context.beginPath();
//         context.moveTo(lastClick[0], lastClick[1]);
//         context.lineTo(x, y, 6);

//         context.strokeStyle = '#000000';
//         context.stroke();

//         clicks = 0;
//     }

//     lastClick = [x, y];
//     console.log("x: " + x, "y: " + y);

//     // setMouse(data, command);
// };


// var data = lastClick;
// var url = '10.18.253.41';
function setMouse(data, command) {
    //   var path =  '/command/HM';// assemble the full URL
    var path1 = '/mouse/500/400'; // assemble the full URL
    var path2 = '/mouse/800/-500';
    var content = '';
    //httpDo( path, 'GET', content, 'text', getResponse); //HTTP PUT the change
    // httpGet(path, responseHandler);
    httpDo(path1, 'POST', content, 'text', responseHandler); //HTTP PUT the change
    httpDo(path2, 'POST', content, 'text', responseHandler); //HTTP PUT the change
}

function setMouseTwo(data, command) {
    //var path =  '/command/HM';// assemble the full URL
    var path2 = '/mouse/800/-500';
    var content = '';
    //httpDo( path, 'GET', content, 'text', getResponse); //HTTP PUT the change
    //httpGet(path, responseHandler);
    httpDo(path2, 'POST', content, 'text', responseHandler); //HTTP PUT the change
}

function responseHandler(result) {
    console.log(result);
}
// var = mouseArr = [];
// $.ajax({ 
//     type: 'POST', 
//     url: '/curr_mouse', 
//     data: { your_data: curr_mouse }, 
//     dataType: 'json',
//     success: function (data) { 
//       // Handle the response here
//       drawLine(e);
//     }
//   });