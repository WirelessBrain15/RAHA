let cam = {label: "webcam", // local webcam 
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
    });
  });
}