# sls-middy

## Overview

Serverless example using [middy](https://github.com/middyjs/middy) for middleware.

This shows an example of how to wrap a simple handler with some middleware to take care of parsing the payload, validating it against a schema, etc.

Deploy in the usual way:

```console
npm install
sls deploy --aws-profile <profile>
```

Post your payload thusly:

```console
 curl -H 'x-api-key:kkkkk' https://<apiid>.execute-api.<region>.amazonaws.com/dev/signup -d '{"first":"Jim","last":"Pansey","email":"jp@example.com"}' -H 'Content-Type:application/json'
 ```

 ## Tests

 * Integration tests - for these, we invoke our lambda handlers directy with stubbed inputs (event, content, callback), and harvest the results in the callback to assert expected behavior.
 * Acceptance tests - run the tests against live API GW endpoints

 Use `npm run integration-tests` to run the integration tests, and `npm run acceptance-tests` to run the acceptance tests. Note to run the acceptance tests you need to specify the endpoint root and api keys via the TEST_ROOT and TEST_KEY environment variables. The form of test root resembles `https://<apigw-id>.execute-api.us-east-1.amazonaws.com/<stage>`. Both TEST_ROOT and TEST_KEY may be obtained via `sls info`.

 ## Debugging

 This project is set up with some visual studio launch configurations and sample events for invoking `sls invoke local` with the correct payloads for the signup and info functions, which allows the functionsgit s to be run locally in a visual studio code debugging secsion.