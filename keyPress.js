
var ros = new ROSLIB.Ros({
    url : 'ws://192.168.1.106:9090'
  });
  
  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });
  
  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });
  
  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });
  
  
  
  var result = new ROSLIB.Topic({
    ros : ros,
    name : '/keyPress',
    messageType : 'std_msgs/String'
  });
  
  // for(var i = 0; i< 10 ; i++)
  // {
  // // var msg = new ROSLIB.Message({JSON.stringify("test_msg")});
  // result.publish("test");
  // }
  
  let started = false;
  
  let x = 0;
  
  var buttonUP = document.getElementById('up');
  var buttonDown = document.getElementById('down');
  var buttonRight = document.getElementById('right');
  var buttonLeft = document.getElementById('left');
  
  buttonUP.addEventListener('mousedown', upStart);
  buttonUP.addEventListener('mouseup', upHold);
  
  buttonDown.addEventListener('mousedown', downStart);
  buttonDown.addEventListener('mouseup', downHold);
  
  buttonLeft.addEventListener('mousedown', leftStart);
  buttonLeft.addEventListener('mouseup', leftHold);
  
  buttonRight.addEventListener('mousedown', rightStart);
  buttonRight.addEventListener('mouseup', rightHold);
  
  
  // button.addEventListener('mouseleave', clearTimers);
  
  function upStart()
  {
      console.log('UP START');
      var msg = new ROSLIB.Message({data:'UPSTART'});
      result.publish(msg);
      started = true;
  }
  
  function upHold()
  {
    console.log('UP HOLD');
    var msg = new ROSLIB.Message({data:'UPHOLD'});
    started = false;
    result.publish(msg);
  }
  
  function downStart()
  {
    console.log('DOWN START');
    var msg = new ROSLIB.Message({data:'DWSTART'});
    result.publish(msg);
    started = true;
  }
  
  function downHold()
  {
    console.log('DOWN HOLD');
    var msg = new ROSLIB.Message({data:'DWHOLD'});
    started = false;
    result.publish(msg);
  }
  
  function leftStart()
  {
      console.log('LEFT START');
      var msg = new ROSLIB.Message({data:'LFSTART'});
      result.publish(msg);
      started = true;
  }
  
  function leftHold()
  {
    console.log('LEFT HOLD');
    var msg = new ROSLIB.Message({data:'LFHOLD'});
    started = false;
    result.publish(msg);
  }
  
  function rightStart()
  {
    console.log('RIGHT START');
    var msg = new ROSLIB.Message({data:'RTSTART'});
    result.publish(msg);
    started = true;
  }
  
  function rightHold()
  {
    console.log('RIGHT HOLD');
    var msg = new ROSLIB.Message({data:'RTHOLD'});
    started = false;
    result.publish(msg);
  }

  // while (started == true)
  // {
  //   var msg = new ROSLIB.Message({data:'W'});
  //   result.publish(msg);
  // }
  
  function holdVal()
  {
    while (started == true)
    {
      var msg = new ROSLIB.Message({data:'W'});
      result.publish(msg);
    }
  }