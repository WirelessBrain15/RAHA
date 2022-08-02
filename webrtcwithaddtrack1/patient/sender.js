//  const camera1Id =  "2UZsPC6h1IFIYs3LOuB0WnAYSdzVRg5LJRMCXeIgjHk="  //c920   
//  const camera2Id = "Nm1pVNdHKHeYtIFG+O87Ljc7vFCYcV1+pOAz/h1Elmo=" //monocamera
//  const microphone =   "QSP3vCHr22/fGtcP3fjOjzrcFCbqIQsRF2jvr9fYrqY="//c920 audio
// //const camera1Id = "drblJjSLMX+1Wj41bgBTji2GpvdvskcLJefmlTagcAU="  //c920   
// //const camera2Id = "abERWhjBEtmw86akbcUG8GrngeY0gknBM8Wqs98rdEM=" //monocamera
// //const microphone = "U3yRaYDi4XgpKsQMfy73B4XwR8/cwwEe3/VPHshaTKc=" //c920 audio
//   const museId =      "wq3e2y4eaemXqL8hDYWCvId7lPm9ZpM2iNqkRzFlDUE="
  
  
  const dermoscope = "itMRCe1Zj4NCrNVxqfiUiYVlgXOARIjhgrBzEOGOuqc="                   //"1+ev9mqu0VJqmWXMSg+HXy9L2w6QryLd+uGPYHNK33w=";
                   //"wj/33J8AMJwDZcMdoQ7W1PaYo9WWlijLOMMJIQKXYk8=";
  const robotic_camera =  "aKoEL8jSMfIuVTPQR2BO7qHcDZIpeVMTEDf6z51eOk8="              //"wj/33J8AMJwDZcMdoQ7W1PaYo9WWlijLOMMJIQKXYk8=";
  const webcam =  "KwIuJ+idc5hR+eGB/2B6an27iO8inIgnRWHRl7x66Ys="//"U4zMyF8W7p3xcVdltbQHR2GkeHTmjzlfDBRTnq+Nk6c="                                 // "7Dz8KbekX70uLdyXBKJmRNaxp/oGBD9bex5GHpQSuKw=";
  const microphone = "zgojaspiMDjZwCvH3/5UQSleJEFXlbSCQpBCkWmnhjs="//"ucHJSqENf40jdAMDTa1uKDugsu6WXI7FEcssa9rEX5A="//"hIGhvZeFwS9SYHnmoA3wPM7Iz0Hz80hddbO79+DEOng=";
  const stethoscope =  "qzGK7YGd1QEKN3mcCnrwQcY55ic890G9/P4yI9h1K7o="           //"b5JGBPz/N2FY1G4N1mAqdKe66+ZfbgewhTw9HXnB3w4=";
  
  
  

  // function peerStream()
  // {
  // navigator.mediaDevices.getUserMedia({video: true,audio:true}).then(stream=>                  
  //     { 
  //     localstream = stream;
  //      for(const track of stream.getTracks())
  //      {
  //          lc.addTrack(track , stream);
  //      }
      
      
  //     lc.createOffer().then(o =>lc.setLocalDescription(o)).then(a => console.log("set successfully"))
                                                                                  
  // })
  // }

  // peerStream();















  
  
  
  
  
  
  
  
  
  
let configuration = {
    iceServers:[{

        "urls":["stun:stun.l.google.com:19302"]
        //"stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"]


    }]


}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ws = new WebSocket("ws://localhost:3000")
// const Sws = new WebSocket("ws://localhost:3004")
// const Dws = new WebSocket("ws://localhost:3002")
const Rws = new WebSocket("ws://localhost:3007")
const switchvideo = new WebSocket("ws://localhost:3006")
const lc = new RTCPeerConnection(configuration);
// const Slc = new RTCPeerConnection(configuration);
// const Dlc = new RTCPeerConnection(configuration);
const Rlc = new RTCPeerConnection(configuration);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let localstream;
let localDescriptor;
let Slocalstream;
let SlocalDescriptor;
let Dlocalstream;
let DlocalDescriptor;
let Rlocalstream;
let RlocalDescriptor;

let localvideo = document.getElementById('localvideo');
let remotevideo = document.getElementById('remotevideo');



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







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
    
    
    console.log(data.data);



})



// Sws.addEventListener('open',()=>{ 

//     console.log("SPatient side connected to server 3004");
//     SpeerStream();

// })

// Sws.addEventListener('message',(data)=>
// {
    
//     const message = JSON.parse(data.data);
    
//     if(message.type === "sdp")
//     {
//         Slc.setRemoteDescription(message.data).then(o=>{

//             console.log("SRemote Description set!!");
            
//         })
//     }

//     else if(message.type === "close")
//     {
//         location.reload();

//     }
    
    
//     console.log(data.data);



// })


// Dws.addEventListener('open',()=>{

//     console.log("DPatient side connected to server 3002");
//     DpeerStream();

// })

// Dws.addEventListener('message',(data)=>
// {
    
//     const message = JSON.parse(data.data);
    
//     if(message.type === "sdp")
//     {
//         Dlc.setRemoteDescription(message.data).then(o=>{

//             console.log("DRemote Description set!!");
            
//         })
//     }

//     else if(message.type === "close")
//     {
//         location.reload();

//     }
    
   
//     console.log(data.data);



// })



Rws.addEventListener('open',()=>{

    console.log("RPatient side connected to server 3007");
    RpeerStream();

})

Rws.addEventListener('message',(data)=>
{
    
    const message = JSON.parse(data.data);
    
    if(message.type === "sdp")
    {
        Rlc.setRemoteDescription(message.data).then(o=>{

            console.log("RRemote Description set!!");
            
        })
    }

    else if(message.type === "close")
    {
        location.reload();

    }
    
   
    console.log(data.data);



})



switchvideo.addEventListener('open',()=>{

    console.log("Patient connected to switch server");
    

})

switchvideo.addEventListener('message',(data)=>
{
    
    const message = JSON.stringify(data);
    
    if(message  === "dermascope")
    {
        localvideo.srcObject = Dlocalstream;
    }

    else if(message === "robotic_camera")
    {
        localvideo.srcObject = Rlocalstream; 

    }

    else if(message === "webcam")
    {
        localvideo.srcObject = localstream;

    }
    
   
    console.log(message);



})




























////////////////////////////////////////////////////////////////////////////////////////////////
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


    })

}
device();

///////////////////////////////////////////////////////////////////////////////////////////////////

function peerStream()
{
navigator.mediaDevices.getUserMedia({video: {deviceId :{exact:webcam}},audio:true}).then(stream=>                  
    { 
    localstream = stream;
     for(const track of stream.getTracks())
     {
         lc.addTrack(track , stream);
     }
     localvideo.srcObject = localstream;
    
    lc.createOffer().then(o =>lc.setLocalDescription(o)).then(a => console.log("set successfully"))
                                                                                
})
}

// function DpeerStream()
// {
// navigator.mediaDevices.getUserMedia({video : {deviceId :{exact:dermoscope}},audio:false}).then(stream=>
//     {
//     Dlocalstream = stream;
//      for(const track of stream.getTracks())
//      {
//          Dlc.addTrack(track , stream);
//      }
    
    
//     Dlc.createOffer().then(o =>Dlc.setLocalDescription(o)).then(a => console.log("set successfully"))
                                                                                
// })
// }

// function SpeerStream()
// {
// navigator.mediaDevices.getUserMedia({video : false,audio:{deviceId:{exact:stethoscope}}}).then(stream=>
//     {
//     Slocalstream = stream;
//      for(const track of stream.getTracks())
//      {
//          Slc.addTrack(track , stream);
//      }``
    
    
//     Slc.createOffer().then(o =>Slc.setLocalDescription(o)).then(a => console.log("Sset successfully"))
                                                                                
// })
// }


function RpeerStream() /////////////////set video and audio id
{
navigator.mediaDevices.getUserMedia({video : {deviceId:{exact:robotic_camera}},audio : false}).then(stream=>
    {
    Rlocalstream = stream;
     for(const track of stream.getTracks())
     {
         Rlc.addTrack(track , stream);
     }
    
    
    Rlc.createOffer().then(o =>Rlc.setLocalDescription(o)).then(a => console.log("Rset successfully"))
                                                                                
})
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



lc.onicecandidate = e =>
{
    console.log("sdp::--->" + JSON.stringify(lc.localDescription))
    localDescriptor = JSON.stringify(lc.localDescription);
    console.log("local descriptor send!!")
    ws.send(localDescriptor);

};


// Slc.onicecandidate = e =>
// {
//     console.log("sdp::--->" + JSON.stringify(Slc.localDescription))
//     SlocalDescriptor = JSON.stringify(Slc.localDescription);
//     console.log("Slocal descriptor send!!")
//     Sws.send(SlocalDescriptor);

// };

// Dlc.onicecandidate = e =>
// {
//     console.log("sdp::--->" + JSON.stringify(Dlc.localDescription))
//     DlocalDescriptor = JSON.stringify(Dlc.localDescription);
//     console.log("local descriptor send!!")
//     Dws.send(DlocalDescriptor);

// };

Rlc.onicecandidate = e =>
{
    console.log("sdp::--->" + JSON.stringify(Rlc.localDescription))
    RlocalDescriptor = JSON.stringify(Rlc.localDescription);
    console.log("local descriptor send!!")
    Rws.send(RlocalDescriptor);

};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
lc.ontrack = function(e)
{

    remotevideo.srcObject = e.streams[0];

}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



















