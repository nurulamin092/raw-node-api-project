/**
 * Title: Uptime Monitoring Application
 * Description: Rest full Api monitor up or down time of user define link
 * Author : Nurul Amin 
 * <Date:16-09-22></Date:16-09-22>
 * 
 */

//dependencies
const http = require('http');
const url = require('url');
const {StringDecoder } = require('string_decoder');

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
app.handleReqRes =(req,res)=>{
    //request handler
    //get the url and parse it
    const parseUrl = url.parse(req.url,true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const headersObject = req.headers;
    const decoder = new StringDecoder('utf-8');
    let  realData ='';

    req.on('data',(buffer)=>{
        realData+= decoder.write(buffer)
    });
    req.on('end',()=>{
        realData += decoder.end();
        console.log(realData); 
        res.end('Hello programmer How are your?');
    })
   

} ;

// server start 
app.createServer(); 


