/*
    RUN CMD
    NAVIGATE TO SERVER FOLDER
    TYPE npm init
    TYPE npn install --save express
 */

/*
    Reboot server:
    CTRL+C
    node servername
 */

//grab tool
const express = require("express");
//initialize tool
const app = express();
//use port for server
const port = 3000;

//run server
app.listen(3000, (err)=>{
    if(err){
        //if error occurs
        console.log(err);
        return false;
    }
    
    console.log("SERVER IS RUNNING");
})

//define server functions by locatins:

//when someone enters server
app.get("/", (req, resp)=>{
    //resp.end("Welcome message");
    resp.sendFile(__dirname+"/htmlfilename.html");
});


//in javascript to use a funciton/data from server:
/*
    fetch("/serverpath/"+input_variable).then((resp)=>{
        //indicate type of response(text, int, object...)
        return resp.return_data_response();
    }).then((return_data_response)=>{
        //do stuff with the returned response from server
    });

 */

app.get("/path/:input_variable", (req, resp)=>{
    
    //save input value as loca variable
    var var_name = req.params.input_variable;
    
    resp.end("Output message");
});