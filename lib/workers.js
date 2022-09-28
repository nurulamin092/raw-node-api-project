/**
 * Title: worker Library
 * Description: worker related files
 * Author : Nurul Amin 
 * <Date:27 -09-22>
 * 
 */

//dependencies
const url = require('url');
const http = require('http');
const https = require('https');
const data = require('./data');
const { parseJSON } = require('../helpers/utilities');
const {sendTwilioSms} = require('../helpers/notifications');




//App object - module scaffolding
const worker = {};

//lookup all the checks
worker.gatherAllChecks = () => {
    // get all the checks 

    data.list('checks', (err, checks) => {
        if (!err && checks && checks.length > 0) {

            checks.forEach(check => {
                // read  the check data
                data.read('checks', check, (err2, originCheckData) => {
                    if (!err2 && originCheckData) {
                        // pass the data to the next process 
                        worker.validateCheckData(parseJSON(originCheckData));

                    } else {
                        console.log('Error: reading one of the check data !');
                    }
                })
            })

        } else {
            console.log('Error: could not find any checks to process!');
        }
    });

}

//validate individual check data

worker.validateCheckData = (originalCheckData) => {
    const originalData = originalCheckData
    if (originalCheckData && originalCheckData.id) {

        originalData.state =
            typeof originalCheckData.state === 'string' &&
                ['up', 'down'].indexOf(originalCheckData.state) > -1 ? originalCheckData.state : 'down';

        originalData.lastChecked =
            typeof originalCheckData.lastChecked === 'number' &&
                originalCheckData.lastChecked > 0 ? originalCheckData.lastChecked : false;

        // pass to the next process

        worker.performCheck();

    } else {
        console.log('Error: check was invalid or not property formatted');
    }
}

// performCheck = (originalData)

worker.performCheck = (originCheckData) => {

    //prepare initial check outcome
    let checkOutCome = {
        'error': false,
        'responseCode': false
    };

    let outcomeSend = false;


    //parse the host name & full url from original data
    const parseUrl = url.parse(originCheckData.protocol + '://' + originCheckData.url, true);
    const hostName = parseUrl.hostname;
    const path = parseUrl.path;

    //construct the request 

    const requestDetails = {
        'protocol': originCheckData.protocol + ':',
        'hostname': hostName,
        'method': originCheckData.method.toUpperCase(),
        'path': path,
        'timeout': originCheckData.timeoutSeconds * 1000,
    };

    const protocolToUse = originCheckData.protocol === 'http' ? http : https;

    let req = protocolToUse.request(requestDetails, (res) => {
        // grab the status of the response 
        const status = res.statusCode;

        // update the check outcome and pass the next process
        checkOutCome.responseCode = status;
        if (!outComeSend) {
            worker.processCheckOutcome(originCheckData, checkOutCome);
            outComeSend = true;
        }
    });

    req.on('error', (e) => {

        checkOutCome = {
            error: true,
            value: e
        }

        if (!outComeSend) {
            worker.processCheckOutcome(originCheckData, checkOutCome);
            outComeSend = true;
        }

    });

    req.on('timeout', () => {
        checkOutCome = {
            error: true,
            value: 'timeout'
        }

        if (!outComeSend) {
            worker.processCheckOutcome(originCheckData, checkOutCome);
            outComeSend = true;
        }

    });

    // req send
    req.end()

};

// save check outcome to database and send to next process
worker.processCheckOutcome = (originCheckData, checkOutCome) => {
    //check if check outcome is up or down
    let state =
        !checkOutCome.error && checkOutCome.responseCode &&
            originCheckData.successCodes.indexOf(checkOutCome.responseCode) > -1 ? 'up' : 'down';

    // decide whether we should alert the user or not
    const alertWanted = !!(originCheckData.lastChecked && originCheckData.state !== state);

    // update the check to disk

    data.update('checks', newCheckData.id, newCheck, (err) => {
        if (!err) {
            // send the check data to next process
            if (alertWanted) {
                worker.alertUserToStatusChange(newCheckData)
            } else {
                console.log('Alert is not needed as there is no state change');
            }
        } else {
            console.log('Error trying to save check data of one of the check');
        }
    });
};

//send notification sms to user if state change

worker.alertUserToStatusChange = (newCheckData) => {
    const msg = `Alert : Your check for ${newCheckData.method.toUpperCase()} ${newCheckData.protocol}:
            //${newCheckData.url} is currently ${newCheckData.state}`;

            sendTwilioSms(newCheckData.userPhone,msg,(err)=>{
                if (!err) {
                    console.log(`user was alert to a status change via sms: ${msg}`);
                } else {
                    console.log('There was a problem sending sms one of the user');
                }
            })
}

// timer to execute the worker process once per minute

worker.loop = () => {
    setInterval(() => {

        worker.gatherAllChecks();

    }, 6000)
}




//  start  the worker
worker.init = () => {
    // execute all the checks 
    worker.gatherAllChecks();

    // call the loop so that checks continue

    worker.loop();
}

// export 

module.exports = worker;


