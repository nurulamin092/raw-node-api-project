/**
 * Title: Handler Request Response 
 * Description : Handle Request and response
 * Author : Nurul Amin 
 * Date 17-09-22
 */
// dependencies 
const url = require('url');
const {StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');
const { parseJSON } = require('./utilities');

// module scaffolding
const handler = {};

handler.handleReqRes =(req,res)=>{
    //request handler
    //get the url and parse it
    const parseUrl = url.parse(req.url,true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parseUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parseUrl,
        path,
        trimmedPath,
        method,
        queryStringObject, 
        headersObject
    };

    const decoder = new StringDecoder('utf-8');
    let  realData ='';

    const chosenHandler = routes[trimmedPath]? routes[trimmedPath]:notFoundHandler; 

    req.on('data',(buffer)=>{
        realData+= decoder.write(buffer);
    });

    req.on('end',()=>{
        realData += decoder.end();
        requestProperties.body = parseJSON(realData);
        chosenHandler(requestProperties,(statusCode,payload)=>{

            statusCode = typeof(statusCode)=== 'number'?statusCode:500;
            payload = typeof payload === 'object' ? payload:{};
    
            const payloadString = JSON.stringify(payload);
    
            //return the final  response
            res.writeHead(statusCode);
            res.end(payloadString);
    
        });
        // res.end('Hello programmer How are your?');
    }); 
} 

module.exports = handler;