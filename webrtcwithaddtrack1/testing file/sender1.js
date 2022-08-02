const camera1Id = "drblJjSLMX+1Wj41bgBTji2GpvdvskcLJefmlTagcAU="  //c920   
const camera2Id = "abERWhjBEtmw86akbcUG8GrngeY0gknBM8Wqs98rdEM=" //monocamera
const audio1Id = "U3yRaYDi4XgpKsQMfy73B4XwR8/cwwEe3/VPHshaTKc=" //c920 audio


let configuration = {
    iceServers:[{

        "urls":["stun:stun.l.google.com:19302","stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"]


    }]


}



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









function DpeerStream()
{
navigator.mediaDevices.getUserMedia({video : {deviceId :{exact:camera2Id}},audio:{deviceId:{exact:audio1Id}}}).then(stream=>
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

