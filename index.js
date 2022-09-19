/**
 * Title: Uptime Monitoring Application
 * Description: Rest full Api monitor up or down time of user define link
 * Author : Nurul Amin 
 * <Date:16-09-22></Date:16-09-22>
 * 
 */

//dependencies
const http = require('http');
const environment = require('./helpers/environments');
const {handleReqRes}  = require('./helpers/handleReqRes');
const data = require('./lib/data');
//App object - module scaffolding
const app ={};

//testing file
//pore muse di

data.create('test','newFile',{name:'Bangladesh',language:'Bengali'},(err)=>{
    console.log(`error was`,err);
})

//configuration
// app.config ={
   
// };

// create server
app.createServer = ()=>{
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port,()=>{
        console.log(`server listening to port at ${environment.port}`);
    });
};

//handle Request Response
app.handleReqRes = handleReqRes; 

// server start 
app.createServer(); 


