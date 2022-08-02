var ros = new ROSLIB.Ros({
    url : 'ws://192.168.0.120:9091'
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
    name : '/mouseClick',
    messageType : 'geometry_msgs/Point'
  });


var container = document.querySelector("#webcamera1");

container.addEventListener("click", function(event)
{
    var rect = container.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log(`x: ${x}   y: ${y}`);
    msg.x = x;
    msg.y = y;
    msg.z = 0;
    result.publish(msg);
},false);
