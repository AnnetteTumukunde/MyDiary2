import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../index';

dotenv.config();
chai.use(chaiHTTP);

const payload = { uid: 3, firstname: "patient", lastname: "resolute", emailCheck: "patient.resolute@gmail.com" };
const token = jwt.sign(payload, process.env.SECRET_KEY);

describe('Server API test', () => {
    it('Checks the status of the server API', finish => {
        chai
            .request(app)
            .get('/api/v1')
            .end((error,response) => {
                expect(response.status).to.equals(200);
                expect(response.body).to.be.an('object');
                expect(response.body.message).to.equals('Server running successfully');
                expect(error).to.be.null;
                finish();
            });
    });
});

describe('Controller API tests', () => {
    describe('Checks the retrieving API endpoints', () => {
        it('Checks the get all entries API endpoint', finish => {
            chai
                .request(app)
                .get('/api/v1/entries')
                .set('x-access-token',token)
                .end((error,response) => {
                    expect(response.status).to.equals(200);
                    expect(response.body).to.be.an('object');
                    expect(response.body.message).to.be.a('string');
                    expect(response.body.status).to.be.a('number');
                    expect(response.body.entries).to.be.an('array');
                    expect(error).to.be.null;
                    finish();
                });
        });
        describe('Get specific entry tests', () => {
            it('Checks the get specific entry API endpoint', finish => {
                chai
                    .request(app)
                    .get('/api/v1/entries/7')
                    .set('x-access-token',token)
                    .end((error, response) => {
                        expect(response.status).to.equals(200);
                        expect(response.body).to.be.an('object');
                        expect(response.body.message).to.be.a('string');
                        expect(response.body.status).not.to.be.null;
                        expect(response.body.entry).to.be.an('array');
                        expect(error).to.be.null;
                        finish();
                    });
            });
            it('Checks the specific entry that does not exist', finish => {
                chai 
                    .request(app)
                    .get('/api/v1/entries/100')
                    .set('x-access-token',token)
                    .end((error, response) => {
                        expect(response.status).to.equals(404);
                        expect(response.body).to.be.an('object');
                        expect(response.body.message).to.be.a('string');
                        expect(response.body.status).to.be.a('number');
                        expect(error).to.be.null;
                        finish();
                    });
            });
        });
    });
    describe('Checks the creating API endpoint', () => {
        it('Checks the entry data from user, with valid data', finish => {
            chai
                .request(app)
                .post('/api/v1/entries')
                .set('x-access-token',token)
                .send({
                    entryTitle: "Something valid",
                    posted: false,
                    viewed: false,
                    entryContent: "Just write something which is valid, but again not below 20 characters.",
                    author: 3
                })
                .end((error, response) => {
                    expect(response.status).to.equals(201);
                    expect(response.body).to.be.an('object');
                    expect(response.body.status).to.be.a('number');
                    expect(response.body.message).not.to.be.null;
                    expect(error).to.be.null;
                    finish();
                });
        });
        it('Checks the entry data from user, with invalid data', finish => {
            chai
                .request(app)
                .post('/api/v1/entries')
                .set('x-access-token',token)
                .send({
                    entryTitle: "Something valid",
                    posted: false,
                    viewed: false,
                    entryContent: 34556,
                    author: 3
                })
                .end((error, response) => {
                    expect(response.status).to.equals(400);
                    expect(response.body).to.be.an('object');
                    expect(response.body.status).to.be.a('number');
                    expect(response.body.message).not.to.be.null;
                    expect(error).to.be.null;
                    finish();
                });
        });
        it('Checks the new user data from user', finish => {
            chai
                .request(app)
                .post('/api/v1/auth/signup')
                .send({
                    uid: 6,
                    firstname: "Thankyou",
                    lastname: "Lord",
                    email: "thankyou.lord@gmail.com",
                    password: "thankyoulord"
                })
                .end((error, response) => {
                    expect(response.status).to.equals(201);
                    expect(response.body).to.be.an('object');
                    expect(response.body.status).to.be.a('number');
                    expect(response.body.message).not.to.be.null;
                    expect(response.body.status).not.to.be.null;
                    expect(error).to.be.null;
                    finish();
                });
        });
        it('Checks the existing user data from user', finish => {
            chai
                .request(app)
                .post('/api/v1/auth/signup')
                .send({
                    uid: 1,
                    firstname: "NewIrene",
                    lastname: "Ishimwe",
                    email: "ireneishimwe@gmail.com",
                    password: "ireneishimwe"
                })
                .end((error, response) => {
                    expect(response.status).to.equals(400);
                    expect(response.body).to.be.an('object');
                    expect(response.body.status).to.be.a('number');
                    expect(response.body.message).not.to.be.null;
                    expect(response.body.status).not.to.be.null;
                    expect(error).to.be.null;
                    finish();
                });
        });
        it('Checks the new invalid user data from user', finish => {
            chai
                .request(app)
                .post('/api/v1/auth/signup')
                .send({
                    firstname: 1345,
                    lastname: "Ishimwe",
                    email: "ireneishimwe@gmail.com",
                    password: "ireneishimwe"
                })
                .end((error, response) => {
                    expect(response.status).to.equals(400);
                    expect(response.body).to.be.an('object');
                    expect(response.body.status).to.be.a('number');
                    expect(response.body.message).not.to.be.null;
                    expect(response.body.status).not.to.be.null;
                    expect(error).to.be.null;
                    finish();
                });
        });
        it('Checks the user data login from user correctly', finish => {
            chai
                .request(app)
                .post('/api/v1/auth/signin')
                .send({
                    email: "patient.resolute@gmail.com",
                    password: "patientresolute"
                })
                .end((error, response) => {
                    expect(response.status).to.equals(201);
                    expect(response.body).to.be.an('object');
                    expect(response.body.status).to.be.a('number');
                    expect(response.body.message).not.to.be.null;
                    expect(response.body.user).to.be.an('object');
                    expect(error).to.be.null;
                    finish();
                });
        });
        it('Checks the user data login from user, but with wrong email', finish => {
            chai
                .request(app)
                .post('/api/v1/auth/signin')
                .send({
                    email: "ireneishimwe12@gmail.com",
                    password: "ireneishimwe"
                })
                .end((error, response) => {
                    expect(response.status).to.equals(400);
                    expect(response.body).to.be.an('object');
                    expect(response.body.status).to.be.a('number');
                    expect(response.body.message).not.to.be.null;
                    expect(error).to.be.null;
                    finish();
                });
        });
        it('Checks the user data login from user, but with wrong password', finish => {
            chai
                .request(app)
                .post('/api/v1/auth/signin')
                .send({
                    email: "ireneishimwe@gmail.com",
                    password: "ireneishim"
                })
                .end((error, response) => {
                    expect(response.status).to.equals(400);
                    expect(response.body).to.be.an('object');
                    expect(response.body.status).to.be.a('number');
                    expect(response.body.message).not.to.be.null;
                    expect(error).to.be.null;
                    finish();
                });
        });
        it('Checks the user data login from user, but with wrong password', finish => {
            chai
                .request(app)
                .post('/api/v1/auth/signin')
                .send({
                    email: 123,
                    password: "ireneishim"
                })
                .end((error, response) => {
                    expect(response.status).to.equals(400);
                    expect(response.body).to.be.an('object');
                    expect(response.body.status).to.be.a('number');
                    expect(response.body.message).not.to.be.null;
                    expect(error).to.be.null;
                    finish();
                });
        });
    });
    describe('Checks the modifying the API endpoint', () => {
        it('Tests if the entry to modify exists', finish => {
            chai
                .request(app)
                .put('/api/v1/entries/3')
                .set('x-access-token',token)
                .send({ entryTitle: 'Should work', posted: true, viewed: false, entryContent: 'Just the same process followed', author: 3 })
                .end((error, response) => {
                    expect(response.status).to.equals(200);
                    expect(response.body).to.be.an('object');
                    expect(response.body.message).to.be.a('string');
                    expect(response.body.status).not.to.be.null;
                    expect(response.body.entry).to.be.an('object');
                    expect(error).to.be.null;
                    finish();
                });
        });
        it('Tests if the entry to modify exists, but with invalid data', finish => {
            chai
                .request(app)
                .put('/api/v1/entries/3')
                .set('x-access-token',token)
                .send({ entryTitle: 123, posted: true, viewed: false, entryContent: 'Just the same process followed', author: 3 })
                .end((error, response) => {
                    expect(response.status).to.equals(400);
                    expect(response.body).to.be.an('object');
                    expect(response.body.message).not.to.be.null;
                    expect(response.body.status).to.be.a('number');
                    expect(error).to.be.null;
                    finish();
                });
        });
        it('Test if the entry to modify does not exist', finish => {
            chai
                .request(app)
                .put('/api/v1/entries/100')
                .set('x-access-token',token)
                .send({ entryTitle: 'Should work', posted: true, viewed: false, entryContent: 'Just the same process followed', author: 3 })
                .end((error, response) => {
                    expect(response.status).to.equals(404);
                    expect(response.body).to.be.an('object');
                    expect(response.body.status).to.be.a('number');
                    expect(response.body.message).not.to.be.null;
                    expect(error).to.be.null;
                    finish();
                });
        });
    });
    describe('Checks the deleting API endpoint', () => {
        it('Test if the entry to delete exists', finish => {
            chai
                .request(app)
                .delete('/api/v1/entries/13')
                .set('x-access-token',token)
                .end((error, response) => {
                    expect(response.status).to.equals(200);
                    expect(response.body).to.be.an('object');
                    expect(response.body.message).to.be.a('string');
                    expect(response.body.status).not.to.be.null;
                    expect(response.body.entry).to.be.an('array');
                    expect(error).to.be.null;
                    finish();
                });
        });
        it('Test if the entry to delete does not exist', finish => {
            chai
                .request(app)
                .delete('/api/v1/entries/100')
                .set('x-access-token',token)
                .end((error, response) => {
                    expect(response.status).to.equals(404);
                    expect(response.body).to.be.an('object');
                    expect(response.body.message).to.be.a('string');
                    expect(response.body.status).to.be.a('number');
                    expect(error).to.be.null;
                    finish();
                });
        });
    });
});
