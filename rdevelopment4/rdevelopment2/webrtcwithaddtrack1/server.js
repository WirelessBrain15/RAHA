const webSocket = require('ws');
/////////////////////////////////////////////////////////////////////////////
const sender_ws = new webSocket.Server({port:3000});
const receiver_ws = new webSocket.Server({port:3001});

// const Dsender_ws = new webSocket.Server({port:3002});
// const Dreceiver_ws = new webSocket.Server({port:3003});

// const Ssender_ws = new webSocket.Server({port:3004});
// const Sreceiver_ws = new webSocket.Server({port:3005});

// const switch_server = new webSocket.Server({port:3006});

const Rsender_ws = new webSocket.Server({port:3007});
const Rreceiver_ws = new webSocket.Server({port:3008});


////////////////////////////////////////////////////////////////////////////////
let senderSDP;
let receiverSDP;
let global_sws;

let DsenderSDP;
let DreceiverSDP;
let Dglobal_sws;

let SsenderSDP;
let SreceiverSDP;
let Sglobal_sws;


let RsenderSDP;
let RreceiverSDP;
let Rglobal_sws;

let switch_value;
////////////////////////////////////////////////////////////////////////////////

console.log("server started!!!")

console.log("D server started!!")

console.log("S server started!!")

console.log("R server started!!")

console.log("switch server started!!");





///////////////////////////////////////////////////////////////////////////////
sender_ws.on('connection',(sws)=>{
    global_sws = sws;
    console.log("CONNECTED TO PATIENT SIDE")
    
    sws.on('message',(message)=>{

        senderSDP = JSON.parse(message);
        console.log("PATIENT SIDE SPD RECIEVED!!")
        console.log(JSON.parse(message)); 



    })

})


// Dsender_ws.on('connection',(sws)=>{
//     Dglobal_sws = sws;
//     console.log("DCONNECTED TO PATIENT SIDE")
    
//     sws.on('message',(message)=>{

//         DsenderSDP = JSON.parse(message);
//         console.log("DPATIENT SIDE SPD RECIEVED!!")
//         console.log(JSON.parse(message)); 



//     })

// })


// Ssender_ws.on('connection',(sws)=>{
//     Sglobal_sws = sws;
//     console.log("SCONNECTED TO PATIENT SIDE")
    
//     sws.on('message',(message)=>{

//         SsenderSDP = JSON.parse(message);
//         console.log("SPATIENT SIDE SDP RECIEVED!!")
//         console.log(JSON.parse(message)); 



//     })

// })


Rsender_ws.on('connection',(sws)=>{
    Rglobal_sws = sws;
    console.log("RCONNECTED TO PATIENT SIDE")
    
    sws.on('message',(message)=>{

        RsenderSDP = JSON.parse(message);
        console.log("RPATIENT SIDE SDP RECIEVED!!")
        console.log(JSON.parse(message)); 



    })

})


// switch_server.on('connection',(sws)=>{

//     console.log("switch server connected");


//     sws.on('message',(message)=>{

//         switch_value = message;
//         console.log(switch_value);
//         sws.send(switch_value);

//     })





// })





/////////////////////////////////////////////receiver server//////////////////////////////////////

receiver_ws.on('connection',(rws)=>{
        

    
    console.log("CONNECTED TO DOCTOR SIDE!!");
    rws.send(JSON.stringify(senderSDP));
       



    


    rws.on('message',(message)=>{

        receiverSDP  = JSON.parse(message);
        console.log("answer of Doctor")
        console.log(receiverSDP);
        let obj = {type:"sdp" , data: receiverSDP}
        global_sws.send(JSON.stringify(obj));
       

        


    })

    rws.on('close',()=>{

        console.log("shutdown");
        let obj = {type:"close"};
        global_sws.send(JSON.stringify(obj));



    })





})



// Dreceiver_ws.on('connection',(rws)=>{
        

    
//     console.log("DCONNECTED TO DOCTOR SIDE!!");
//     rws.send(JSON.stringify(DsenderSDP));
       



    


//     rws.on('message',(message)=>{

//         DreceiverSDP  = JSON.parse(message);
//         console.log("Danswer of Doctor")
//         console.log(DreceiverSDP);
//         let obj = {type:"sdp" , data: DreceiverSDP}
//         Dglobal_sws.send(JSON.stringify(obj));
       

        


//     })

//     rws.on('close',()=>{

//         console.log("shutdown");
//         let obj = {type:"close"};
//         Dglobal_sws.send(JSON.stringify(obj));



//     })





// })


// Sreceiver_ws.on('connection',(rws)=>{
        

    
//     console.log("SCONNECTED TO DOCTOR SIDE!!");
//     rws.send(JSON.stringify(SsenderSDP));
       



    


//     rws.on('message',(message)=>{

//         SreceiverSDP  = JSON.parse(message);
//         console.log("Sanswer of Doctor")
//         console.log(SreceiverSDP);
//         let obj = {type:"sdp" , data: SreceiverSDP}
//         Sglobal_sws.send(JSON.stringify(obj));
       

        


//     })

//     rws.on('close',()=>{

//         console.log("shutdown");
//         let obj = {type:"close"};
//         Sglobal_sws.send(JSON.stringify(obj));



//     })





// })



Rreceiver_ws.on('connection',(rws)=>{
        

    
    console.log("RCONNECTED TO DOCTOR SIDE!!");
    rws.send(JSON.stringify(RsenderSDP));
       



    


    rws.on('message',(message)=>{

        RreceiverSDP  = JSON.parse(message);
        console.log("Ranswer of Doctor")
        console.log(RreceiverSDP);
        let obj = {type:"sdp" , data: RreceiverSDP}
        Rglobal_sws.send(JSON.stringify(obj));
       

        


    })

    rws.on('close',()=>{

        console.log("shutdown");
        let obj = {type:"close"};
        Rglobal_sws.send(JSON.stringify(obj));



    })





})














/////////////////////////////////////////////////////////////////////////////////////////////////






