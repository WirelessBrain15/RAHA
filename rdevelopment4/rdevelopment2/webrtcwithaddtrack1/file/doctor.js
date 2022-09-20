let configuration = {
    iceServers:[{

        "urls":["stun:stun.l.google.com:19302"]
        //,"stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"]


    }]


}

///////////////////////////////////////////STREAM/////////////////////////////////////////////////////

let webcam;
let dermascope;
let robotic_camera;
let stethoscope;

////////////////////////////////////////RTCCONNECTION//////////////////////////////////////////////////////
const lc = new RTCPeerConnection(configuration);
const ws = new WebSocket("ws://192.168.0.107:3001");



// const Dlc = new RTCPeerConnection(configuration);
// const Dws = new WebSocket("ws://192.168.0.132:3003");

// const Slc = new RTCPeerConnection(configuration);
// const Sws = new WebSocket("ws://192.168.0.132:3005");

const Rlc = new RTCPeerConnection(configuration);
const Rws = new WebSocket("ws://192.168.0.107:3008");

// const switchpatient = new WebSocket("ws://192.168.0.132:3006");


///////////////////////////////////////////DOCUMENTSECTION//////////////////////////////////////////////////////

const remotevideo = document.getElementById('remotevideo');
const localvideo  = document.getElementById('localvideo');
const audiostream  = document.getElementById('audiostream');
const multivideo = document.getElementById('multivideo');
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
let localstream;
let offer ;
let localDescriptor;

let Slocalstream;
let Soffer ;
let SlocalDescriptor;


let Dlocalstream;
let Doffer ;
let DlocalDescriptor;

let Rlocalstream;
let Roffer ;
let RlocalDescriptor;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
ws.addEventListener('open',()=>
{
    console.log("Doctor side connected to server 3001");

    

})


ws.addEventListener('message',(data)=>
{
    offer = JSON.parse(data.data);
    console.log("offer received!!");
    console.log(offer);
    peerStream();



})




// Dws.addEventListener('open',()=>
// {
//     console.log("DDoctor side connected to server 3003");

    

// })


// Dws.addEventListener('message',(data)=>
// {
//     console.log(data.data)
//     Doffer = JSON.parse(data.data);
//     console.log("Doffer received!!");
//     console.log(Doffer);
//     DpeerStream();



// })



// Sws.addEventListener('open',()=>
// {
//     console.log("SDoctor side connected to server 3005");

    

// })


// Sws.addEventListener('message',(data)=>
// {
//     console.log(data.data)
//     Soffer = JSON.parse(data.data);
//     console.log("Soffer received!!");
//     console.log(Soffer);
//     SpeerStream();



// })

Rws.addEventListener('open',()=>
{
    console.log("RDoctor side connected to server 3008");

    

})


Rws.addEventListener('message',(data)=>
{
    console.log(data.data)
    Roffer = JSON.parse(data.data);
    console.log("Roffer received!!");
    console.log(Roffer);
    RpeerStream();



})

// switchpatient.addEventListener('open',()=>
// {
//     console.log("connected to switch server");

    

// })




//////////////////////////////////////////////////////////////////////////////////////////////////









lc.ontrack = function(event)
    {
        
        
       
          
          webcam = event.streams[0];
          remotevideo.srcObject = webcam;
    }




    // Dlc.ontrack = function(event)
    // {
        
        
      
       
       
    //      dermascope = event.streams[0];
    // }


    // Slc.ontrack = function(event)
    // {
        
        
      
       
        
    //     stethoscope = event.streams[0];
    // }


    Rlc.ontrack = function(event)
    {
        
        
       
          
          robotic_camera = event.streams[0];
          
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function peerStream()
{
navigator.mediaDevices.getUserMedia({video : true,audio:true}).then(stream=>
    {
    localstream = stream;
    localvideo.srcObject = localstream;
     for(const track of stream.getTracks())
     {
         lc.addTrack(track , stream);
     }
    
    
    lc.setRemoteDescription(offer).then(a=>console.log("remoter offer set"));
    lc.createAnswer().then(o =>lc.setLocalDescription(o)).then(a => console.log("set successfully"))
                                                                            
})
}




// function DpeerStream()
// {

//     Dlc.setRemoteDescription(Doffer).then(a=>console.log("Dremoter offer set"));
//     Dlc.createAnswer().then(o =>Dlc.setLocalDescription(o)).then(a => console.log("Dset successfully"))
// }




// function SpeerStream()
// {

    
//     Slc.setRemoteDescription(Soffer).then(a=>console.log("Sremoter offer set"));
//     Slc.createAnswer().then(o =>Slc.setLocalDescription(o)).then(a => console.log("Sset successfully"))
                                                                            

// }

function RpeerStream()
{

    Rlc.setRemoteDescription(Roffer).then(a=>console.log("Rremoter offer set"));
    Rlc.createAnswer().then(o =>Rlc.setLocalDescription(o)).then(a => console.log("Rset successfully"))
}



//////////////////////////////////////////////ICECANDIDATE///////////////////////////////////////////////////////////

lc.onicecandidate = e =>
{
    console.log("sdp::--->" + JSON.stringify(lc.localDescription))
    console.log("sending answer!!")
    localDescriptor = lc.localDescription;
    ws.send(JSON.stringify(localDescriptor));
    


};



// Dlc.onicecandidate = e =>
// {
//     console.log("sdp::--->" + JSON.stringify(Dlc.localDescription))
//     console.log("sending answer!!")
//     DlocalDescriptor = Dlc.localDescription;
//     Dws.send(JSON.stringify(DlocalDescriptor));
    


// };



// Slc.onicecandidate = e =>
// {
//     console.log("sdp::--->" + JSON.stringify(Slc.localDescription))
//     console.log("sending answer!!")
//     SlocalDescriptor = Slc.localDescription;
//     Sws.send(JSON.stringify(SlocalDescriptor));
    


// };


Rlc.onicecandidate = e =>
{
    console.log("sdp::--->" + JSON.stringify(Rlc.localDescription))
    console.log("sending answer!!")
    RlocalDescriptor = Rlc.localDescription;
    Rws.send(JSON.stringify(RlocalDescriptor));
    


};

////////////////////////////////////////////////////////////////////////////////////////////////////












// function dermascope_button()
// {
	
// 	document.getElementById("dermascope").addEventListener("click",function (){
	
        
//         console.log("dermascope button pressed!!")
//         multivideo.srcObject = dermascope;
//         audiostream.muted = true;
//         remotevideo.muted = false;
//         switchpatient.send(JSON.stringify("dermascope"));
      
    
    
//     });




// }


function roboticcamera_button()
{
	
	document.getElementById("robotic_camera").addEventListener("click",function (){
	
        
        console.log("robotic camera button pressed")
        multivideo.srcObject = robotic_camera;
        audiostream.muted = true;
        remotevideo.muted = false;
        // switchpatient.send(JSON.stringify("robotic_camera"));
        
    
    
    });




}

let audioOn = false;

// function stethoscope_button()
// {
	
// 	document.getElementById("stethoscope").addEventListener("click",function (){
	
//         if(audioOn === false)
//         {
//         console.log("stethoscope button pressed ON")
//         audiostream.srcObject = stethoscope;
//         remotevideo.muted = true;
        
//         audiostream.muted = false;
//         audioOn = true;
//         }
//         else
//         {
//             console.log("stethoscope button pressed OFF")
//             remotevideo.muted = false;
//             audiostream.muted = true;
//             audioOn = false;


//         }
       
        
    
    
//     });




// }

// function webcam_button()
// {
	
// 	document.getElementById("webcam").addEventListener("click",function (){
	
        
        
//         switchpatient.send(JSON.stringify("webcam"));
        
    
    
//     });




// }













// dermascope_button();
// webcam_button();

roboticcamera_button();

// stethoscope_button();


/////////////////////////////////////////////////////////////////////////////////////////































