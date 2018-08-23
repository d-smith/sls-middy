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