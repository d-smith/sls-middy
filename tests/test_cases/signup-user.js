const expect = require('chai').expect;
const when = require('../steps/when');

describe(`When we invoke the info endpoint`, async () => {
    it(`Should return the sign up now page`, async () => {
        let res = await when.we_invoke_get_signup_info();
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Sign up plz');
    });
});


describe(`When we invoke the sign up endpoint with a valid payload`, async () => {
    it(`Should indicate signup succeeded`, async () => {
        let payload = {
            first: 'firstName',
            last: 'lastName',
            email: 'fl@example.com'
        };

        let res = await when.we_invoke_signup(payload);
        expect(res.statusCode).to.equal(200);
        console.log(res.body);
        expect(res.body.message).to.equal('Sign up succeeded');
        
    });
});

describe(`When we signup with an invalid payload`, async () => {
    it(`Should return an error indicating failed validation`, async () => {
        let payload = {};
        let res = await when.we_invoke_signup(payload);
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.include('failed validation');
    });
});
