# sls-middy

Serverless example using [middy]() for middleware.

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