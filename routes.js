/**
 * Title: Routes 
 * Description : Application Routes 
 * Author : Nurul Amin 
 * Date 17-09-22
 */
const {sampleHandler }= require('./handlers/routeHandlers/sampleHandler');
const {userHandler }= require('./handlers/routeHandlers/ userHandler');

const routes ={
    sample: sampleHandler,
    user:userHandler
   
};

module.exports = routes;