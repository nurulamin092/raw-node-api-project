/**
 * Title: Server Library
 * Description: server related files
 * Author : Nurul Amin 
 * <Date:27 -09-22>
 * 
 */

//dependencies
const http = require('http');
const {handleReqRes}  = require('../helpers/handleReqRes');

//App object - module scaffolding
const server ={};


// configuration

server.config = { 
    port: 4000
}

// create server
server.createServer = ()=>{
    const createServerVariable = http.createServer(server.handleReqRes);
    createServerVariable.listen(server.port,()=>{
        console.log(`server listening to port at ${server.config .port}`);
    });
};

//handle Request Response
server.handleReqRes = handleReqRes; 

// server start 
server.init = ()=>{
    server.createServer(); 
}

// export 

module.exports = server;


