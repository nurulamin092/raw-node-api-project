/**
 * Title: Sample Handler 
 * Description : Handle Handler
 * Author : Nurul Amin 
 * Date 17-09-22
 */

// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties,callback)=>{
    console.log(requestProperties);
    callback(200,{
        message:'this is simple url'
    });
}

module.exports = handler ;