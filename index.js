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
const { sendTwilioSms } = require('./helpers/notifications');
const data = require('./lib/data');
//App object - module scaffolding
const app ={};


sendTwilioSms ('01916252884','Hello world',(err)=>{
    console.log(`This is the error`,err);
});

// configuration

app.config = {
    port: 3000
}
//testing file
//pore muse di

// data.create('test','newFile',{name:'Bangladesh',language:'Bengali'},(err)=>{
//     console.log(`error was`,err);
// });

// data read
// data.read('test','newFile',(err,data)=>{
//     console.log(data,err);
// })

// data update

// data.update('test','newFile',{name:"Lakshmipur",language:"Noakhali"},(err)=>{
//     console.log(err);
// })

// file delete
// data.delete('test','newFile',(err)=>{
//     console.log(err);
// })
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


