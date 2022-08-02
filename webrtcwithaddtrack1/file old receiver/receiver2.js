let configuration = {
    iceServers:[{

        "urls":["stun:stun.l.google.com:19302"]
        //,"stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"]


    }]


}



let camera1stream;
let camera2stream;
const lc = new RTCPeerConnection(configuration);
const ws = new WebSocket("ws://192.168.0.118:3001");



const Dlc = new RTCPeerConnection(configuration);
const Dws = new WebSocket("ws://192.168.0.118:3003");



const remotevideo = document.getElementById('remotevideo');
const localvideo  = document.getElementById('localvideo');
 
let localstream;
let offer ;
let localDescriptor;


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















lc.ontrack = function(event)
    {
        
        console.log(event)
       
          //remotevideo.srcObject = event.streams[0];
          camera1stream = event.streams[0];
    }





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



lc.onicecandidate = e =>
{
    console.log("sdp::--->" + JSON.stringify(lc.localDescription))
    console.log("sending answer!!")
    localDescriptor = lc.localDescription;
    ws.send(JSON.stringify(localDescriptor));
    


};


///////////////////////////////////////////////////////////////////////



//const Dremotevideo = document.getElementById('localvideo');
let Dlocalstream;
let Doffer ;
let DlocalDescriptor;

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















Dlc.ontrack = function(event)
    {
        
        console.log(event)
      
       
        //Dremotevideo.srcObject = event.streams[0];
         camera2stream = event.streams[0];
    }





function DpeerStream()
{
navigator.mediaDevices.getUserMedia({video : true,audio:false}).then(stream=>
    {
    Dlocalstream = stream;
    // for(const track of stream.getTracks())
    // {
    //     lc.addTrack(track , stream);
    // }
    
    
    Dlc.setRemoteDescription(Doffer).then(a=>console.log("Dremoter offer set"));
    Dlc.createAnswer().then(o =>Dlc.setLocalDescription(o)).then(a => console.log("Dset successfully"))
                                                                            
})
}



Dlc.onicecandidate = e =>
{
    console.log("sdp::--->" + JSON.stringify(Dlc.localDescription))
    console.log("sending answer!!")
    DlocalDescriptor = Dlc.localDescription;
    Dws.send(JSON.stringify(DlocalDescriptor));
    


};


function attachlistener()
{
	
	document.getElementById("webcamera").addEventListener("click",function (){
	
        //Dremotevideo.scrObject = camera1stream;
        console.log("button pressed camera1stream")
        remotevideo.srcObject = camera1stream;
        //cameraflag = 0;
    
    
    });




}


function attachlistener1()
{
	
	document.getElementById("webcamera1").addEventListener("click",function (){
	
        //Dremotevideo.scrObject = camera2stream;
        console.log("button pressed camera2stream")
        remotevideo.srcObject = camera2stream;
        
    
    
    });




}


attachlistener();


attachlistener1();