/**
 * Title: Environments  
 * Description : Handle all environment related things
 * Author : Nurul Amin 
 * Date 17-09-22
 */

// Dependencies 

//Scaffolding

const environments ={};

environments.staging = {
    port:3000,
    evnName :'staging',
    secretKey:'hdnskmkdskdsj',
    maxChecks : 5, 
    twilio: {
        fromPhone: '+15005550006',
        accountSid : 'AC0e344d3bbbcfe2fd6a9735999ba751f9',
        authToken : 'f17667671b547086719a27ba5ca3947f'

    }
}

environments.production ={
    port:4000,
    evnName:'production',
    secretKey:'udhruherherjwe',
    maxCheck : 5,
    twilio: {
        fromPhone: '+15005550006',
        accountSid : 'AC0e344d3bbbcfe2fd6a9735999ba751f9',
        authToken : 'f17667671b547086719a27ba5ca3947f'
    }
}

// determined which environment is passed

const currentEnvironment = 
typeof(process.env.NODE_ENV)==='string'?process.env.NODE_ENV:'staging';

// export corresponding environment object

const environmentToExport = 
typeof environments[currentEnvironment] === 'object'
?environments[currentEnvironment]:environments.staging;

module.exports = environmentToExport; 