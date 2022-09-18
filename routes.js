/**
 * Title: Routes 
 * Description : Application Routes 
 * Author : Nurul Amin 
 * Date 17-09-22
 */
const {sampleHandler }= require('./handlers/routeHandlers/sampleHandler')
const routes ={
    'sample': sampleHandler,
   
};

module.exports = routes;