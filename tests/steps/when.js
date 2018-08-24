const APP_ROOT = '../../';
const _ = require('lodash');

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
    let handler = require(`${APP_ROOT}/functions/handler`).signup;
    let event = {
        body: payload
    };

    return viaHandler(event, handler);
}

const we_invoke_get_signup_info = () => {
    let handler = require(`${APP_ROOT}/functions/handler`).info;
    return viaHandler({}, handler);
}
  

module.exports = {
    we_invoke_get_signup_info,
    we_invoke_signup
}; 