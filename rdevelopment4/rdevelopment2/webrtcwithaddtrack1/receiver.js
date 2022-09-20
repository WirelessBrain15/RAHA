let configuration = {
    iceServers:[{

        "urls":["stun:stun.l.google.com:19302"]
        //,"stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"]
    }]
}

///////////////////////////////////////////////////////////////////////////////////////////

let camera1stream;
let camera2stream;
let audiostream;
const lc = new RTCPeerConnection(configuration);
const ws = new WebSocket("ws://localhost:3001");



const Dlc = new RTCPeerConnection(configuration);
const Dws = new WebSocket("ws://localhost:3003");

const Slc = new RTCPeerConnection(configuration);
const Sws = new WebSocket("ws://localhost:3005");

const switch_client = new WebSocket("ws://localhost:3006");

////////////////////////////////////////////////////////////////////////////////////////////////////

const remotevideo = document.getElementById('remotevideo');
const localvideo  = document.getElementById('localvideo');
const stetaudio  = document.getElementById('audiostream');
///////////////////////////////////////////////////////////////////////////////////////////////////////
let localstream;
let offer ;
let localDescriptor;


let Dlocalstream;
let Doffer ;
let DlocalDescriptor;


let Slocalstream;
let Soffer ;
let SlocalDescriptor;

let switch_value;


////////////////////////////////////////////////////////////////////////////////////////////////////////

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



Dws.addEventListener('open',()=>
{
    console.log("DDoctor side connected to server 3003");

    

})


Dws.addEventListener('message',(data)=>
{
    console.log(data.data)
    Doffer = JSON.parse(data.data);
    console.log("Doffer received!!");
    console.log(Doffer);
    DpeerStream();



})


Sws.addEventListener('open',()=>
{
    console.log("SDoctor side connected to server 3005");

    

})


Sws.addEventListener('message',(data)=>
{
    console.log(data.data)
    Soffer = JSON.parse(data.data);
    console.log("Soffer received!!");
    console.log(Soffer);
    SpeerStream();



})








////////////////////////////////////////////////////////////////////////////////////////////////////////////
function peerStream()
{
navigator.mediaDevices.getUserMedia({video : true,audio:false}).then(stream=>
    {
    localstream = stream;
    localvideo.srcObject = localstream;
    // for(const track of stream.getTracks())
    // {
    //     lc.addTrack(track , stream);
    // }
    
    
    lc.setRemoteDescription(offer).then(a=>console.log("remoter offer set"));
    lc.createAnswer().then(o =>lc.setLocalDescription(o)).then(a => console.log("set successfully"))
  
   
                                                                            
})
}

function  DpeerStream()
{

    Dlc.setRemoteDescription(Doffer).then(a=>console.log("Dremoter offer set"));
    Dlc.createAnswer().then(o =>Dlc.setLocalDescription(o)).then(a => console.log("Dset successfully"))


}


function SpeerStream()
{

    Slc.setRemoteDescription(Soffer).then(a=>console.log("Sremoter offer set"));
    Slc.createAnswer().then(o =>Slc.setLocalDescription(o)).then(a => console.log("Sset successfully"));


}




///////////////////////////////////////////////////////////////////////////////////////////////////////

lc.onicecandidate = e =>
{
    console.log("sdp::--->" + JSON.stringify(lc.localDescription))
    console.log("sending answer!!")
    localDescriptor = lc.localDescription;
    ws.send(JSON.stringify(localDescriptor));
    


};

Dlc.onicecandidate = e =>
{
    console.log("sdp::--->" + JSON.stringify(Dlc.localDescription))
    console.log("sending answer!!")
    DlocalDescriptor = Dlc.localDescription;
    Dws.send(JSON.stringify(DlocalDescriptor));
    


};


Slc.onicecandidate = e =>
{
    console.log("sdp::--->" + JSON.stringify(Slc.localDescription))
    console.log("sending answer!!")
    SlocalDescriptor = Slc.localDescription;
    Sws.send(JSON.stringify(SlocalDescriptor));
    


};


//////////////////////////////////////////////////////////////////////////////////////

Dlc.ontrack = function(event)
    {
        
        console.log(event)
      
       
        //Dremotevideo.srcObject = event.streams[0];
         camera2stream = event.streams[0];
    }



lc.ontrack = function(event)
    {
        
        console.log(event)
       
          //remotevideo.srcObject = event.streams[0];
          camera1stream = event.streams[0];
    }


Slc.ontrack = function(event)
    {
        
        console.log(event)
      
       
        //Dremotevideo.srcObject = event.streams[0];
         audiostream = event.streams[0];
    }













///////////////////////////////////////////////////////////////////////



//const Dremotevideo = document.getElementById('localvideo');
function attachlistener()
{
	
	document.getElementById("webcamera").addEventListener("click",function (){
	
        //Dremotevideo.scrObject = camera1stream;
        console.log("button pressed camera1stream")
        remotevideo.srcObject = camera1stream;
        stetaudio.muted = true;
        remotevideo.muted = false;
        switch_value = "camera1";
        switch_client.send(switch_value);
        //cameraflag = 0;
    
    
    });




}


function attachlistener1()
{
	
	document.getElementById("webcamera1").addEventListener("click",function (){
	
        //Dremotevideo.scrObject = camera2stream;
        console.log("button pressed camera2stream")
        remotevideo.srcObject = camera2stream;
        stetaudio.muted = true;
        remotevideo.muted = false;
        switch_value = "camera2";
        switch_client.send(switch_value);
        
    
    
    });




}


function audiolistener()
{
	
	document.getElementById("stethoscope").addEventListener("click",function (){
	
        //Dremotevideo.scrObject = camera2stream;
        console.log("button pressed audiostream")
        stetaudio.srcObject = audiostream;
        remotevideo.muted = true;
        stetaudio.muted = false;
        console.log("hello stethoscope")
        switch_value = "stethoscope";
        switch_client.send(switch_value);
        
    
    
    });




}


attachlistener();
attachlistener1();
audiolistener();


/////////////////////////////////////////////////////////////////////////////////////////





























