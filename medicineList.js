var ros = new ROSLIB.Ros({
    url : 'ws://192.168.0.120:9092'
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
  name : '/medicine',
  messageType : 'medicine_despense/medicine'
  });
  
  var msg = new ROSLIB.Message(
      {medicine_list: ["bananas","are","excellent", "source","of","pottassium","period","iconoclastic"]}
  );

container.addEventListener("click", function(event)
{
  result.publish(msg);
  // console.log('hello');
},false);
