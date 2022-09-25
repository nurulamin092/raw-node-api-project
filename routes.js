/**
 * Title: Routes 
 * Description : Application Routes 
 * Author : Nurul Amin 
 * Date 17-09-22
 */

// dependencies
const {sampleHandler} = require('./handlers/routeHandlers/sampleHandler');
const {userHandler} = require ('./handlers/routeHandlers/ userHandler');
const {tokenHandler} = require ('./handlers/routeHandlers/tokenHandler');

const routes = {
    sample: sampleHandler,
    user: userHandler,
    token: tokenHandler,
};

module.exports = routes;