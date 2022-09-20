const camera1Id = "wj/33J8AMJwDZcMdoQ7W1PaYo9WWlijLOMMJIQKXYk8="  //c920
const camera2Id = "R7qdCxEnnXnOFUdFl5BJU7oRDIOGOFkubPGZMF6Uhq0=" //monocamera
const audio1Id = "kiu385sQDkv873Wq8qVMR4SS84yKlHaskS1tCy2fHc0=" //c920 audio
const video = document.getElementById("video");


function stream(){


    navigator.mediaDevices.getUserMedia({video:{deviceId:{exact:camera1Id}},audio  : true}).then(stream=>{



        video.srcObject = stream;



    })











}


stream();










function device()
{
    navigator.mediaDevices.enumerateDevices().then(devices=>{

       
        
         devices.forEach(function(device){

             console.log(device);
             console.log(device.kind);
             console.log(device.label)
             console.log(device.groupId);
             console.log(device.deviceId);

         })       


        
        //video.srcObject = stream;
        

        // })





    })






}

device();
