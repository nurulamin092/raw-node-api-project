/**
 * Title: Uptime Monitoring Application
 * Description: Rest full Api monitor up or down time of user define link
 * Author : Nurul Amin 
 * <Date:16-09-22></Date:16-09-22>
 * 
 */

//dependencies
const server = require('./lib/server');
const workers = require('./lib/workers');

//App object - module scaffolding
const app ={};


app.init = () => {
     // start the server 
    server.init();
    // start the workers
    workers.init();
};

app.init();

// export the app

module.exports = app;   



