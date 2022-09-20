/**
 * Title: Utilities  
 * Description : Important  utilities function
 * Author : Nurul Amin 
 * Date 17-09-22
 */

// Dependencies 

// Scaffolding 

const utilities ={};

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

module.exports = utilities;