const webSocket = require('ws');

console.log("D server started!!")

let DsenderSDP;
let DreceiverSDP;
let Dglobal_sws;

const Dsender_ws = new webSocket.Server({port:3002});
const Dreceiver_ws = new webSocket.Server({port:3003});

Dsender_ws.on('connection',(sws)=>{
    Dglobal_sws = sws;
    console.log("DCONNECTED TO PATIENT SIDE")
    
    sws.on('message',(message)=>{

        DsenderSDP = JSON.parse(message);
        console.log("DPATIENT SIDE SPD RECIEVED!!")
        console.log(JSON.parse(message)); 



    })

})




Dreceiver_ws.on('connection',(rws)=>{
        

    
    console.log("DCONNECTED TO DOCTOR SIDE!!");
    rws.send(JSON.stringify(DsenderSDP));
       



    


    rws.on('message',(message)=>{

        DreceiverSDP  = JSON.parse(message);
        console.log("Danswer of Doctor")
        console.log(DreceiverSDP);
        let obj = {type:"sdp" , data: DreceiverSDP}
        Dglobal_sws.send(JSON.stringify(obj));
       

        


    })

    rws.on('close',()=>{

        console.log("shutdown");
        let obj = {type:"close"};
        Dglobal_sws.send(JSON.stringify(obj));



    })





})

