/**
 * Title: Utilities  
 * Description : Important  utilities function
 * Author : Nurul Amin 
 * Date 17-09-22
 */

// Dependencies 

// Scaffolding 
const crypto = require('crypto');
const utilities ={};
const environments = require('./environments');

//parse JSON string to object

utilities.parseJSON = (jsonString)=>{
    let output;
    try{
        output = JSON.parse(jsonString);
    }
    catch{
        output={} 
    }
    return output;
}

utilities.hash =(str)=>{
    if (typeof str === 'string' && str.length>0) {
        const hash = crypto.createHmac('sha256',environments.secretKey)
        .update(str).digest('hex');
        return hash;
    }
    return false;
}



module.exports = utilities;