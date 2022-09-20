/**
 * Title: user Handler 
 * Description : Handler to handle user related routes
 * Author : Nurul Amin 
 * Date 19-09-22
 */

const handle ={};

handle.userHandler =(requestProperties,callback)=>{
    const acceptedMethods = ['get','post','put','delete'];
    if (acceptedMethods.indexOf(requestProperties.method)>-1) {
        handle._users[requestProperties.method](requestProperties,callback )
    }
 else{
    callback(405);
 }
              
}

handle._users ={};

handle._users.post =(requestProperties,callback)=>{

}

handle._users.get= (requestProperties,callback)=>{
callback(200)
}

handle._users.put=(requestProperties,callback)=>{

}

handle._users.delete=(requestProperties,callback)=>{
    
}


module.exports = handle