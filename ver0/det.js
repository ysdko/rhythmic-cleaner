// //windowオブジェクトにdocumentオブジェクトが含まれる
// //alertなどのメソッドはwindowオブジェクトに含まれる
// //ref. DOM
// var target = document.getElementById("btn");
// //イベントに応じて呼び出す関数を登録
// target.addEventListener("click", init);

// function init(){

// }

// var tBox1 = document.getElementById("tBox1");
// var tBox2 = document.getElementById("tBox2");
// var tBox3 = document.getElementById("tBox3");

var tBox1= document.getElementById("tBox1");  
var tBox2= document.getElementById("tBox2");  
var tBox3= document.getElementById("tBox3");  
tBox1.innerHTML='test1';
tBox2.innerHTML='OK';
tBox3.innerHTML='finish';

// window.addEventListener("deviceorientation", handleOrientation, false);

// function handleOrientation(event) {

//     var absolute = event.absolute;
//     var alpha    = event.alpha;
//     var beta     = event.beta;
//     var gamma    = event.gamma;

//     // var message1 = 'alpha = ${alpha}'
//     // var message2 = 'beta  = ${beta}'
//     // var message3 = 'gamma = ${gamma}'

//     var tBox1= document.getElementById("tBox1");  
//     var tBox2= document.getElementById("tBox2");  
//     var tBox3= document.getElementById("tBox3");  
//     tBox1.innerHTML=alpha;
//     tBox2.innerHTML=beta;
//     tBox3.innerHTML=gamma;

// };