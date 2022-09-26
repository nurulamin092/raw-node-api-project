/**
 * Title: Check Handler 
 * Description : Handler to handle Check related routes
 * Author : Nurul Amin 
 * Date 19-09-22
 */

//dependencies

const data = require('../../lib/data');
const{hash, parseJSON, createRandomString} = require('../../helpers/utilities');
const tokenHandler = require('./tokenHandler');
const {maxChecks} = require('../../helpers/environments'); 

//module scaffolding
const handler = {};

handler.checkHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._check[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._check = {};

handler._check.post =(requestProperties,callback)=>{
  //validate input  

 let protocol = typeof requestProperties.body.protocol === 'string' && 
        ['http','https'].indexOf(requestProperties.body.protocol) > -1 ?
        requestProperties.body.protocol : false;

 let url = typeof requestProperties.body.url === 'string' && 
        requestProperties.body.url.trim().length > 0 ?
        requestProperties.body.url : false;

 let method = typeof requestProperties.body.method === 'string' && ['GET','POST','PUT','DELETE'] 
        .indexOf(requestProperties.body.method) > -1 ? requestProperties.body.method : false;

 let  successCodes = typeof requestProperties.body.successCodes === 'object' && 
        requestProperties.body.successCodes instanceof Array ? 
        requestProperties.body.successCodes : false;

 let  timeoutSeconds = typeof requestProperties.body.timeoutSeconds === 'number' && 
      requestProperties.body.timeoutSeconds % 1 === 0 && requestProperties.body.timeoutSeconds >= 1 &&
      requestProperties.body.timeoutSeconds <= 5 ? requestProperties.body.timeoutSeconds : false;
      
      if (protocol && url && method && successCodes && timeoutSeconds) {

         
        //lookup the user phone by reading the token
        data.read('tokens',token,(err1,tokenData) => {

            if (!err1 && tokenData) {

                let userPhone = parseJSON(tokenData).phone;
                //lookup the user data
                data.read('users',userPhone,(err2,userData)=> {
                    if (!err2 && userData) {
                        
                        tokenHandler._token.verify(token,userPhone ,(tokenIsValid) => {
                            if (tokenIsValid) {
                                
                                let userObject = parseJSON(userData);
                                let userChecks = typeof (userObject.checks) === 'object' &&
                                userObject.checks instanceof Array ? userObject.checks : [];

                                if (userChecks.length < maxChecks) {
                                    let checkId = createRandomString(20);
                                    let checkObject = {
                                        id : checkId,
                                        userPhone,
                                        protocol,
                                        url,
                                        method,
                                        successCodes,
                                        timeoutSeconds,
                                    };

                                    // save the object
                                    data.create('checks',checkId,checkObject,(err3)=>{
                                        if (!err3) {
                                            // add check id to the user's object
                                            userObject.checks = userChecks;
                                            userObject.checks.push(checkId);

                                            // save the new user data
                                            data.update('users',userPhone  ,userObject,(err4) => {
                                                if (!err4) {
                                                    callback(200,checkObject)
                                                } else {
                                                    callback (500,{
                                                        error:'There was a problem in the server side!'
                                                    }); 
                                                }
                                            })

                                            // save the new user data 
                                        } else {
                                            callback (500,{
                                                error:'There was a problem in the server side!'
                                            });
                                        }
                                    })
                                    
                                } else {
                                    callback (401,{
                                        error : 'User already recheck max check limit!'
                                    })
                                }

                            } else {
                                callback (403, {
                                    error: 'Authentication problem ....'
                                });
                            }
                        });
                    } else {
                        callback(403 , {
                            error: 'User not found!'
                        })
                    }
                });

            } else {
                callback (403,{
                    error: 'Authentication problem .... 3'
                })
            }
        })
        
      } else {

        callback (400,{
            error: ' Your have a problem in your request ...!'
        })
      }
  
}

handler._check.get= (requestProperties,callback)=>{
//check the phone number is valid

const id = 
typeof requestProperties.queryStringObject.id == 'string' &&
requestProperties.queryStringObject.id .trim().length ===20 ?
requestProperties.queryStringObject.id : false;
 
if (id) {
    // lookup the check
    data.read('checks',id,(err1,checkData)=> {
        if (!err1 && checkData) {
            const token = 
                  typeof requestProperties.headersObject.token === 'string' ?
                  requestProperties.headersObject.token : false;

            tokenHandler._token.verify(token,parseJSON(checkData).userPhone,(tokenIsValid) => { 
                if (tokenIsValid) {
                    callback (200,parseJSON(checkData))
                } else {

                    callback (403,{
                        error: 'Authentication failure!'
                    });
                }
            });

        } else {
            callback (500,{
                error: 'You have a problem in your request ...2'
            })
        }

    });
} else {
    callback (400,{
        error: ' Your have a problem in your request ...1!'
    })
}


}

// put request
handler._check.put = (requestProperties, callback) => {
    // check the phone number if valid
   
};

handler._check.delete=(requestProperties,callback)=>{
    
   

}


module.exports = handler