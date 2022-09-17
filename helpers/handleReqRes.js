/**
 * Title: Handler Request Response 
 * Description : Handle Request and response
 * Author : Nurul Amin 
 * Date 17-09-22
 */
// dependencies 
const url = require('url');
const {StringDecoder } = require('string_decoder');
// module scaffolding
const handler = {};
handler.handleReqRes =(req,res)=>{
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
    }); 
} ;

module.exports = handler;