var vdeviceId = [];
var adeviceId = [];
var flag = false;
var count = 0;
var idx = 0;
let test1, test2;
var video2 = document.querySelector("#videoElement2"); 

function switchCam()
{
  flag = !flag;
  
  if (idx == 0)
  {
    // idx = 0;
    video2.srcObject = test1;
  }
  else if( idx == 1)
  {
    video2.srcObject = test2;
  }
  console.log(idx);
  idx ++;
  if(idx >= 2)
  {
    idx = 0;
  }
}

// ------------------------------------------------------------
let cam = {label: "webcam", // webcam video
kind: "videoinput"}

let cam1 = {label: "webcam", // webcam video
kind: "videoinput"}
let cam2 = {label: "robot cam",   // robot cam video
kind: "videoinput"}
let cam3 = {label: "dermoscope cam",
kind: "videoinput"}


let mic1 = {label: "webcam",    // webam audio
kind: "audioinput"}
let mic2 = {label: "robot cam",   // robot cam audio
kind: "audioinput"}

// method 2
// let cameras = [
//   {
//   "label": "EasyCamera: EasyCamera",
//   'kind': "videoinput"
//   },
//   {'label': "USB2.0 Digital Camera: USB2.0 D",
//   'kind': "videoinput"},
//   {'label': "",        // Placeholder
//   'kind': "videoinput"}
// ]

getList();
makeList();

// sensorVideo2();
// sensorVideo();
function makeList()
{
  navigator.mediaDevices.enumerateDevices().then((devices) =>
  {
    devices.forEach((device) =>
    {
      switch(device.label)
      {
        case "EasyCamera: EasyCamera":    // local webcam
          cam.deviceId = device.deviceId;
          console.log("found local webcam");
          console.log(cam);
          break;
        case "USB 2.0 1080P Camera: USB 2.0 1":    // webcam video
          cam1.deviceId = device.deviceId;
          console.log("found cam1 : webcam");
          console.log(cam1);
          break;
        case "USB 2.0 1080P Camera Analog Stereo":    // webcam audio
          mic1.deviceId = device.deviceId;
          console.log("found mic1 : webcam mic");
          console.log(mic1);
          break;
        case "RecordexUSA: RecordexUSA":    // robot cam
          cam2.deviceId = device.deviceId;
          console.log("found cam2 : robot cam");
          console.log(cam2);
          // console.log(cam2.deviceId)
          break;
        case "RecordexUSA Analog Stereo":    // robot mic
          mic2.deviceId = device.deviceId;
          console.log("found mic2 : robot mic");
          console.log(mic2);
          break;
        case "USB2.0 Digital Camera: USB2.0 D":   // dermoscope cam
          cam3.deviceId = device.deviceId;
          console.log("found cam3 : dermoscope cam");
          console.log(cam3);
          break;
        
      }
      // method 2
    //   cameras.forEach(cam => {if (cam.label == device.label)
    // {
    //   cam.id = device.deviceId;
    //   console.log('cam found')
    //   if (device.label == "EasyCamera: EasyCamera")
    //   {cam1.deviceId = cam.id;
    //   console.log(cam1);}
    //   else if (device.label == "USB2.0 Digital Camera: USB2.0 D")
    //   {cam2.deviceId = cam.id;
    //   console.log(cam2);}
    //   // console.log(cam);
    // }})

    });
  });
}

// ------------------------------------------------------------

function getList()
{
  navigator.mediaDevices.enumerateDevices().then((devices) => 
  {
    devices.forEach((device) => {console.log(device);
    });
  });
}

navigator.mediaDevices.enumerateDevices().then((devices) => 
{
  // let videoSource = document.getElementById("video-source");
  // let audioSource = document.getElementById("audio-source");
  devices.forEach((device) => {
    let option = new Option();
    option.value = device.deviceId;
    // console.log(device);

    // According to the type of media device
    switch(device.kind){
        // Append device to list of Cameras
        case "videoinput":
            option.text = device.label;
            vdeviceId.push(device.deviceId);
            // console.log(JSON.stringify(device.kind+device.deviceId));
            // videoSource.appendChild(option);
            break;
        // Append device to list of Microphone
        case "audioinput":
            option.text = device.label;
            adeviceId.push(device.deviceId);
            // console.log(device.deviceId);
            // audioSource.appendChild(option);
            break;
    }
    // console.log(vdeviceId);
  //   console.log(vdeviceId);
  });
});

function startStream()
{

  
  // sensorVideo2();
  sensorVideo();
  var video = document.querySelector("#videoElement");
  // var video2 = document.querySelector("#videoElement2");
  // var audio = document.querySelector("#audioElement");
  // var vdeviceId = 'hNz/stgkzEDgszFjsjcaDgAlsxh15kBUfoq+pg5E5fI=';
  // if (flag == false)
  // {
    // vdeviceId = 'Q5q98uhE+3oqrP9S7cH3qPPQoV7vnDvPud19hPMilmA=';
    // console.log('switchstream');
  // }
  
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: {
      deviceId:{
        exact: cam.deviceId//vdeviceId[0]
      },
    },
    audio: false//true
   })
        .then(function (stream) {
        video.srcObject = stream;
        })
        .catch(function (err0r) {
        console.log("Something went wrong!");
        });
    }
}

function sensorVideo()
{
  // var video2 = document.querySelector("#videoElement2"); 
  navigator.mediaDevices.getUserMedia({ video: {
    deviceId:{
      exact: cam2.deviceId//vdeviceId[1]
    },
  },
  })
      .then(function (stream2) {
      test1 = stream2;
      // video2.srcObject = stream2;
      })
      .catch(function (err0r) {
      console.log("Something went wrong!");
      });
}
function sensorVideo2()
{
  // var video2 = document.querySelector("#videoElement2"); 
  navigator.mediaDevices.getUserMedia({ video: {
    deviceId:{
      exact: cam3.deviceId//vdeviceId[0]
    },
  },
  // audio: true
  })
      .then(function (stream2) {
      test2 = stream2;
      // video2.srcObject = stream2;
      })
      .catch(function (err0r) {
      console.log("Something went wrong!");
      });
}
function sensorAudio()
{
  var audio = document.querySelector("#audioElement");
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (audioStream) {
    audio.srcObject = audioStream;
    })
    .catch(function (err0r) {
    console.log("Something went wrong!");
    });
}


// ---------------------------------------------------------------------------

// check for mediaDevices.enumerateDevices() support
// function switchCam()
// {
//     if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
//         console.log("enumerateDevices() not supported.");
//         // return;
//       }
    
//       navigator.mediaDevices.enumerateDevices()
//       .then(function(devices) {
//         devices.forEach(function(device) {
//           console.log(device.kind + ": " + device.label +
//                       " id = " + device.deviceId);
//         });
//       })
//       .catch(function(err) {
//         console.log(err.name + ": " + err.message);
//       });
// }
