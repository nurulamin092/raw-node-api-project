/**
 * Title: Uptime Monitoring Application
 * Description: Rest full Api monitor up or down time of user define link
 * Author : Nurul Amin 
 * <Date:16-09-22></Date:16-09-22>
 * 
 */

//dependencies
const http = require('http');
const {handleReqRes}  = require('./helpers/handleReqRes');


//App object - module scaffolding
const app ={};

//configuration
app.config ={
    port : 3000,
};

// create server
app.createServer = ()=>{
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port,()=>{
        console.log(`server listening to port at ${app.config.port}`);
    });
};

//handle Request Response
app.handleReqRes = handleReqRes;

// server start 
app.createServer(); 


