const APP_ROOT = '../../';
const _ = require('lodash');
const rq = require('request');
const mode    = process.env.TEST_MODE;

const postOptions = (opts) => {
    let headers = {};
    headers['Content-Type'] = 'application/json';

    apiKey = _.get(opts, 'apiKey');
    if(apiKey) {
        headers['x-api-key'] = apiKey;
    }

    return {
        method: 'POST',
        body: _.get(opts, 'body'),
        json: true,
        headers: headers
    };
}

const getOptions = (opts) => {
    let headers = {};
    apiKey = _.get(opts, 'apiKey');
    if(apiKey) {
        headers['x-api-key'] = apiKey;
    }

    return {
        method: 'GET',
        json: true,
        headers: headers
    };
}

const viaHttp = (relPath, method, opts) => {
    let root = process.env.TEST_ROOT;
    let url = `${root}/${relPath}`;

    var options;

    switch(method) {
        case 'GET':
            options = getOptions(opts);
            break;
        case 'POST':
            options = postOptions(opts);
            break;
        default:
            throw new Error('Method must be GET or POST');
            break;
    }

    options.uri = url;
    console.log(`Invoking rq with options ${JSON.stringify(options)}`);

    return new Promise((resolve, reject) => {
        let callback = function(err, response, body) {
            if(err) {
                reject(err);
            } else {
//                console.log(`response is ${JSON.stringify(response)}`);
//                console.log(`body is ${JSON.stringify(body)}`);
                resolve(response);
            }
        }

        rq(options, callback);
    });
}

const viaHandler = (event, handler) => {
    return new Promise((resolve, reject) => {
        
        let callback = function (err, response) {
            if (err) {
                reject(err);
            } else {
                let contentType = _.get(response, 'headers.Content-Type', 'unknown');
                if (response.body && contentType === 'application/json') {
                    response.body = JSON.parse(response.body);
                }

                resolve(response);
            }
        };

        let context = {};
        handler(event, context, callback);
    });
};

const we_invoke_signup = (payload) => {
    if(mode === 'http') {
        let opts = {
            body: payload,
            apiKey: process.env.TEST_KEY
        }

        return viaHttp('signup', 'POST', opts);
    } else {
        let handler = require(`${APP_ROOT}/functions/handler`).signup;
        let event = {
            body: payload
        };

        return viaHandler(event, handler);
    }
    
}

const we_invoke_get_signup_info = () => {
    if(mode === 'http') {
        let opts = {
            apiKey: process.env.TEST_KEY
        }

        return viaHttp('info', 'GET', opts);
    } else {
        let handler = require(`${APP_ROOT}/functions/handler`).info;
        return viaHandler({}, handler);
    }
    
}
  

module.exports = {
    we_invoke_get_signup_info,
    we_invoke_signup
}; 