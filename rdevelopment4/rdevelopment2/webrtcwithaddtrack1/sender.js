//  const camera1Id =  "2UZsPC6h1IFIYs3LOuB0WnAYSdzVRg5LJRMCXeIgjHk="  //c920   
//  const camera2Id = "Nm1pVNdHKHeYtIFG+O87Ljc7vFCYcV1+pOAz/h1Elmo=" //monocamera
//  const microphone =   "QSP3vCHr22/fGtcP3fjOjzrcFCbqIQsRF2jvr9fYrqY="//c920 audio
// //const camera1Id = "drblJjSLMX+1Wj41bgBTji2GpvdvskcLJefmlTagcAU="  //c920   
// //const camera2Id = "abERWhjBEtmw86akbcUG8GrngeY0gknBM8Wqs98rdEM=" //monocamera
// //const microphone = "U3yRaYDi4XgpKsQMfy73B4XwR8/cwwEe3/VPHshaTKc=" //c920 audio
//   const museId =      "wq3e2y4eaemXqL8hDYWCvId7lPm9ZpM2iNqkRzFlDUE="
  
  
  const dermoscope = "Ij2neZe+CeFWiwyinZ3mw8ExI0lOZRySwv9PYC3u6sw="                   //"1+ev9mqu0VJqmWXMSg+HXy9L2w6QryLd+uGPYHNK33w=";
                   //"wj/33J8AMJwDZcMdoQ7W1PaYo9WWlijLOMMJIQKXYk8=";
  const robotic_camera =  "aKoEL8jSMfIuVTPQR2BO7qHcDZIpeVMTEDf6z51eOk8="              //"wj/33J8AMJwDZcMdoQ7W1PaYo9WWlijLOMMJIQKXYk8=";
  const webcam =  "Sip1y5xPs8bz5rg3neE56oLVke++w4VbiZlBwVMOOE8="                                 // "7Dz8KbekX70uLdyXBKJmRNaxp/oGBD9bex5GHpQSuKw=";
  const microphone = "7LlXJnx9heS8dMW60eJLINlfA+107ook1x+IwvhQx8g="//"hIGhvZeFwS9SYHnmoA3wPM7Iz0Hz80hddbO79+DEOng=";
  const stethoscope =  "gPdK+a3IrQDlmfwRtPQpEZOq8otNEUik0tp/3WMz2xw="           //"b5JGBPz/N2FY1G4N1mAqdKe66+ZfbgewhTw9HXnB3w4=";
  
  
  
  
  
  
  
  
  
  
  
  
  
let configuration = {
    iceServers:[{

        "urls":["stun:stun.l.google.com:19302"]
        //"stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"]


    }]


}


const ws = new WebSocket("ws://localhost:3000")
const lc = new RTCPeerConnection(configuration);
let localstream;
let localDescriptor;
let localvideo = document.getElementById('localvideo');

ws.addEventListener('open',()=>{

    console.log("Patient side connected to server 3000");
    peerStream();

})

ws.addEventListener('message',(data)=>
{
    
    const message = JSON.parse(data.data);
    
    if(message.type === "sdp")
    {
        lc.setRemoteDescription(message.data).then(o=>{

            console.log("Remote Description set!!");
            
        })
    }

    else if(message.type === "close")
    {
        location.reload();

    }
    
    //const answer = JSON.parse(data.data);
    //console.log("ANSWER RECEIVED!!");
    console.log(data.data);
//     lc.setRemoteDescription(answer).then(o=>{

//         console.log("Remote Description set!!");

// })


})


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







function peerStream()
{
navigator.mediaDevices.getUserMedia({video: {deviceId :{exact:webcam}},audio:true}).then(stream=>                  //
    { 
    localstream = stream;
     for(const track of stream.getTracks())
     {
         lc.addTrack(track , stream);
     }
    
    
    lc.createOffer().then(o =>lc.setLocalDescription(o)).then(a => console.log("set successfully"))
                                                                                
})
}


lc.onicecandidate = e =>
{
    console.log("sdp::--->" + JSON.stringify(lc.localDescription))
    localDescriptor = JSON.stringify(lc.localDescription);
    console.log("local descriptor send!!")
    ws.send(localDescriptor);

};

lc.ontrack = function(e)
{

    localvideo.srcObject = e.streams[0];

}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Sws = new WebSocket("ws://localhost:3004")
const Slc = new RTCPeerConnection(configuration);
let Slocalstream;
let SlocalDescriptor;
let Sremotevideo = document.getElementById('remotevideo');
Sws.addEventListener('open',()=>{

    console.log("SPatient side connected to server 3004");
    SpeerStream();

})

Sws.addEventListener('message',(data)=>
{
    
    const message = JSON.parse(data.data);
    
    if(message.type === "sdp")
    {
        Slc.setRemoteDescription(message.data).then(o=>{

            console.log("SRemote Description set!!");
            
        })
    }

    else if(message.type === "close")
    {
        location.reload();

    }
    
    //const answer = JSON.parse(data.data);
    //console.log("ANSWER RECEIVED!!");
    console.log(data.data);
//     lc.setRemoteDescription(answer).then(o=>{

//         console.log("Remote Description set!!");

// })


})












function SpeerStream()
{
navigator.mediaDevices.getUserMedia({video : false,audio:{deviceId:{exact:stethoscope}}}).then(stream=>
    {
    Slocalstream = stream;
     for(const track of stream.getTracks())
     {
         Slc.addTrack(track , stream);
     }
    
    
    Slc.createOffer().then(o =>Slc.setLocalDescription(o)).then(a => console.log("Sset successfully"))
                                                                                
})
}


Slc.onicecandidate = e =>
{
    console.log("sdp::--->" + JSON.stringify(Slc.localDescription))
    SlocalDescriptor = JSON.stringify(Slc.localDescription);
    console.log("Slocal descriptor send!!")
    Sws.send(SlocalDescriptor);

};

Slc.ontrack = function(e)
{

    Sremotevideo.srcObject = e.streams[0];

}

////////////////////////////////////////////////stethoscope////////////////////////////////

const Dws = new WebSocket("ws://localhost:3002")
const Dlc = new RTCPeerConnection(configuration);
let Dlocalstream;
let DlocalDescriptor;
let Dremotevideo = document.getElementById('remotevideo');
Dws.addEventListener('open',()=>{

    console.log("DPatient side connected to server 3002");
    DpeerStream();

})

Dws.addEventListener('message',(data)=>
{
    
    const message = JSON.parse(data.data);
    
    if(message.type === "sdp")
    {
        Dlc.setRemoteDescription(message.data).then(o=>{

            console.log("DRemote Description set!!");
            
        })
    }

    else if(message.type === "close")
    {
        location.reload();

    }
    
    //const answer = JSON.parse(data.data);
    //console.log("ANSWER RECEIVED!!");
    console.log(data.data);
//     lc.setRemoteDescription(answer).then(o=>{

//         console.log("Remote Description set!!");

// })


})












function DpeerStream()
{
navigator.mediaDevices.getUserMedia({video : {deviceId :{exact:robotic_camera}},audio:{deviceId:{exact:microphone}}}).then(stream=>
    {
    Dlocalstream = stream;
     for(const track of stream.getTracks())
     {
         Dlc.addTrack(track , stream);
     }
    
    
    Dlc.createOffer().then(o =>Dlc.setLocalDescription(o)).then(a => console.log("set successfully"))
                                                                                
})
}


Dlc.onicecandidate = e =>
{
    console.log("sdp::--->" + JSON.stringify(Dlc.localDescription))
    DlocalDescriptor = JSON.stringify(Dlc.localDescription);
    console.log("local descriptor send!!")
    Dws.send(DlocalDescriptor);

};

Dlc.ontrack = function(e)
{

    Dremotevideo.srcObject = e.streams[0];

}






















