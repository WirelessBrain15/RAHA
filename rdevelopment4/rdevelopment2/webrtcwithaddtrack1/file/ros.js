

// ---------------------------------------------------------------------
var ros = new ROSLIB.Ros({
    url : 'ws://192.168.0.107:9091'     //MEDLIST
  });

// var keyPress = new ROSLIB.Ros({
//     url : 'ws://192.168.0.132:9091'     //KEYPRESS
//   });

// ---------------------------------------------------------------------
var resultKP = new ROSLIB.Topic({
    ros : ros,
    name : '/keyPress',
    messageType : 'std_msgs/String'
});
  
var resultMed = new ROSLIB.Topic({
    ros : ros,
    name : '/medicine',
    messageType : 'std_msgs/String'
});

var resultMC = new ROSLIB.Topic({
    ros : ros,
    name : '/mouseClick',
    messageType : 'geometry_msgs/Point'
});

var resultTL = new ROSLIB.Topic({
  ros : ros,
  name : '/telescope',
  messageType : 'std_msgs/String'
});
  // ---------------------------------------------------------------------
  var buttonUP = document.getElementById('up');
  var buttonDown = document.getElementById('down');
  var buttonRight = document.getElementById('right');
  var buttonLeft = document.getElementById('left');
  
  buttonUP.addEventListener('mousedown', rightStart);
  buttonUP.addEventListener('mouseup', upHold);
  
  buttonDown.addEventListener('mousedown', leftStart);
  buttonDown.addEventListener('mouseup', upHold);
  
  buttonLeft.addEventListener('mousedown', upStart);
  buttonLeft.addEventListener('mouseup', upHold);
  
  buttonRight.addEventListener('mousedown', downStart);
  buttonRight.addEventListener('mouseup', upHold);
  
  function upStart()
  {
      console.log('UP START');
      var msgKP = new ROSLIB.Message({data:'Y U'});
      resultKP.publish(msgKP);
      started = true;
  }
  
  function upHold()
  {
    console.log('UP HOLD');
    var msgKP = new ROSLIB.Message({data:'Y W'});
    started = false;
    resultKP.publish(msgKP);
  }
  
  function downStart()
  {
    console.log('DOWN START');
    var msgKP = new ROSLIB.Message({data:'Y D'});
    resultKP.publish(msgKP);
    started = true;
  }
  
  function downHold()
  {
    console.log('DOWN HOLD');
    var msgKP = new ROSLIB.Message({data:'DWHOLD'});
    started = false;
    resultKP.publish(msgKP);
  }
  
  function leftStart()
  {
      console.log('LEFT START');
      var msgKP = new ROSLIB.Message({data:'Y L'});
      resultKP.publish(msgKP);
      started = true;
  }
  
  function leftHold()
  {
    console.log('LEFT HOLD');
    var msgKP = new ROSLIB.Message({data:'LFHOLD'});
    started = false;
    resultKP.publish(msgKP);
  }
  
  function rightStart()
  {
    console.log('RIGHT START');
    var msgKP = new ROSLIB.Message({data:'Y R'});
    resultKP.publish(msgKP);
    started = true;
  }
  
  function rightHold()
  {
    console.log('RIGHT HOLD');
    var msgKP = new ROSLIB.Message({data:'RTHOLD'});
    started = false;
    resultKP.publish(msgKP);
  }
// --------------------------------------------------------------------- 
var list = ["A", "B", "C", "D"]   
var count = 0;
// var msgMed = new ROSLIB.Message(
//     {medicine_list: list[i]}
// );

var buttonMed = document.getElementById('dispenseMed');

buttonMed.addEventListener("click", function(event)
{
  console.log(msgMed);
  var msgMed = new ROSLIB.Message({data:list[count]});
resultMed.publish(msgMed);
count++;
},false);

// ---------------------------------------------------------------------

var msgMC = new ROSLIB.Message({
    x : 0,
    y : 0,
    z : 0
});

var containerVid = document.querySelector('#remotevideo');

containerVid.addEventListener("click", function(event)
{
    var rect = containerVid.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log(`x: ${x}   y: ${y}`);
    msgMC.x = x;
    msgMC.y = y;
    msgMC.z = 0;
    resultMC.publish(msgMC);
},false);
// ---------------------------------------------------------------------

var flagTL = true;

var buttonTL = document.getElementById('telescope');
buttonTL.addEventListener("click", () => {
  if (flagTL == false)
    {resultTL.publish({data:"0"});}
  else
    {resultTL.publish({data:"1199999"});}
  console.log(flagTL);
  flagTL = !flagTL;
})

// ---------------------------------------------------------------------
