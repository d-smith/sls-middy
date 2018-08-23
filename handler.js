const middy = require('middy')
const { jsonBodyParser, validator, httpErrorHandler } = require('middy/middlewares')

const processSignup = (event, context, callback) => {
  

  const { first, last, email } = event.body

  console.log(`sign up ${first} ${last} with email ${email}`);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!'
    }),
  };

  callback(null, response);
};

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      required: ['first', 'last', 'email'],
      properties: {
        first: { type: 'string', minLength: 1 },
        last: { type: 'string', minLength: 1 },
        email: { type: 'string', minLength: 1 }
      }
    }
  }
}

const signup = middy(processSignup)
  .use(jsonBodyParser())
  .use(validator({inputSchema}))
  .use(httpErrorHandler());

module.exports = {signup}
