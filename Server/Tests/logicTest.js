import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import moment from 'moment';
import app from '../index';

chai.use(chaiHTTP);

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
                .end((error,response) => {
                    expect(response.status).to.equals(200);
                    expect(response.body).to.be.an('object');
                    expect(response.body.message).to.be.a('string');
                    expect(response.body.status).to.be.a('number');
                    expect(error).to.be.null;
                    finish();
                });
        });
        describe('Get specific entry tests', () => {
            it('Checks the get specific entry API endpoint', finish => {
                chai
                    .request(app)
                    .get('/api/v1/entries/1 || /api/v1/entries/2 || /api/v1/entries/3')
                    .end((error, response) => {
                        expect(response.status).to.equals(200);
                        expect(response.body).to.be.an('object');
                        expect(response.body.message).to.be.a('string');
                        expect(error).to.be.null;
                        finish();
                    });
            });
            it('Checks the specific entry that does not exist', finish => {
                chai 
                    .request(app)
                    .get('/api/v1/entries/100')
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
        it('Checks the entry data from user', finish => {
            chai
                .request(app)
                .post('/api/v1/entries')
                .send({
                    entryTitle: "Something valid",
                    entryDate: moment().format('ll'),
                    posted: false,
                    viewed: false,
                    entryContent: "Just write something which is valid, but again not below 20 characters."
                })
                .end((error, response) => {
                    expect(response.status).to.equals(400);
                    expect(response.body).to.be.an('object');
                    expect(response.body.status).to.be.a('number');
                    expect(error).to.be.null;
                    finish();
                });
        });
        it('Checks the user data from user', finish => {
            chai
                .request(app)
                .post('/api/v1/auth/signup')
                .send({
                    firstname: "Irene",
                    lastname: "Ishimwe",
                    email: "ireneishimwe@gmail.com"
                })
                .end((error, response) => {
                    expect(response.status).to.equals(400);
                    expect(response.body).to.be.an('object');
                    expect(response.body.status).to.be.a('number');
                    expect(error).to.be.null;
                    finish();
                });
        });
    });
    describe('Checks the modifying the API endpoint', () => {
        it('Tests if the entry to modify exists', finish => {
            chai
                .request(app)
                .put('/api/v1/entries/1 || /api/v1/entries/2 || /api/v1/entries/3')
                .send({ entryTitle: 'Should work', posted: true, viewed: false, entryContent: 'Just the same process followed' })
                .end((error, response) => {
                    expect(response.status).to.equals(200);
                    expect(response.body).to.be.an('object');
                    expect(response.body.message).to.be.a('string');
                    expect(error).to.be.null;
                    finish();
                });
        });
        it('Test if the entry to modify does not exist', finish => {
            chai
                .request(app)
                .put('/api/v1/entries/:id')
                .end((error, response) => {
                    expect(response.status).to.equals(400);
                    expect(response.body).to.be.an('object');
                    expect(response.body.status).to.be.a('number');
                    expect(error).to.be.null;
                    finish();
                });
        });
    });
    describe('Checks the deleting API endpoint', () => {
        it('Test if the entry to delete exists', finish => {
            chai
                .request(app)
                .delete('/api/v1/entries/1 || /api/v1/entries/2 || /api/v1/entries/3')
                .end((error, response) => {
                    expect(response.status).to.equals(200);
                    expect(response.body).to.be.an('object');
                    expect(response.body.message).to.be.a('string');
                    expect(error).to.be.null;
                    finish();
                });
        });
        it('Test if the entry to delete does not exist', finish => {
            chai
                .request(app)
                .delete('/api/v1/entries/1abc')
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
