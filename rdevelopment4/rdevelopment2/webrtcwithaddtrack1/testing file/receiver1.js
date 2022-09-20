let configuration = {
    iceServers:[{

        "urls":["stun:stun.l.google.com:19302","stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"]


    }]


}


const Dlc = new RTCPeerConnection(configuration);
const Dws = new WebSocket("ws://localhost:3003");
const Dremotevideo = document.getElementById('localvideo');
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
        Dremotevideo.srcObject = event.streams[0];
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
