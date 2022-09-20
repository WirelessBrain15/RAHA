const express = require('express');
const path = require('path');

const lpath = path.resolve(__dirname,'file','page.html');

console.log(lpath);



const app = express();

app.use(express.static('./file'));

app.get('/Doctor',(req,res)=>{

    res.status(200).sendFile(lpath);
})





app.listen(8000,()=>
{
    console.log("hosting Doctor page on port 8000");


});

