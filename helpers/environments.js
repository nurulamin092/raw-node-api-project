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
    secretKey:'hdnskmkdskdsj'
}

environments.production ={
    port:4000,
    evnName:'production',
    secretKey:'udhruherherjwe'
}

// determined which environment is passed

const currentEnvironment = 
typeof(process.env.NODE_ENV)==='string'?process.env.NODE_ENV:'staging';

// export corresponding environment object

const environmentToExport = 
typeof environments[currentEnvironment] === 'object'
?environments[currentEnvironment]:environments.staging;

module.exports = environmentToExport; 