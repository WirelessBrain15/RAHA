 
const lc = new RTCPeerConnection();
const ws = new WebSocket("ws://192.168.1.42:3001");
const remotevideo = document.getElementById('remotevideo');
const localvideo = document.getElementById('localvideo');
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
        remotevideo.srcObject = event.streams[0];
    }





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



lc.onicecandidate = e =>
{
    console.log("sdp::--->" + JSON.stringify(lc.localDescription))
    console.log("sending answer!!")
    localDescriptor = lc.localDescription;
    ws.send(JSON.stringify(localDescriptor));
   


};


