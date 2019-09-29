import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
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
                    expect(response.body.data[0]).to.be.an('object');
                    finish();
                });
        });
        describe('Get specific entry tests', () => {
            it('Checks the get specific entry API endpoint', finish => {
                chai
                    .request(app)
                    .get('/api/v1/entries/Success || /api/v1/entries/Happiness || /api/v1/entries/Worry')
                    .end((error, response) => {
                        expect(response.status).to.equals(200);
                        expect(response.body).to.be.an('object');
                        finish();
                    });
            });
            it('Checks the specific entry that does not exist', finish => {
                chai 
                    .request(app)
                    .get('/api/v1/entries/:entry_title')
                    .end((error, response) => {
                        expect(response.status).to.equals(404);
                        expect(response.body.message).to.equals('Entry not found');
                        expect(response.body.status).to.equals(404);
                        finish();
                    });
            });
        });
    });
    describe('Checks the creating API endpoint', () => {
        it('Checks the create new entry API endpoint', finish => {
            chai
                .request(app)
                .post('/api/v1/newentry')
                .send({
                    id: 1,
                    entry_title: "something",
                    entry_date: "Sep 10",
                    posted: false,
                    viewed: false,
                    entry_content: "Just write about anything"
                })
                .end((error, response) => {
                    expect(response.status).to.equals(201);
                    expect(response.body).to.be.an('object');
                    expect(response.body.addedentry).to.be.an('object');
                    expect(response.body.newentries).to.be.an('number');
                    expect(response.body.newentry).to.be.an('object');
                    expect(response.body.newentr).to.be.an('number');
                    expect(response.body.addedentry.id).to.be.a('number');
                    expect(response.body.addedentry.entry_title).to.be.a('string');
                    expect(response.body.addedentry.entry_date).to.be.a('string');
                    expect(response.body.addedentry.posted).to.be.a('boolean');
                    expect(response.body.addedentry.viewed).to.be.a('boolean');
                    expect(response.body.newentry.entry_content).to.be.a('string');
                    finish();
                });
        });
    });
    describe('Checks the modifying the API endpoint', () => {
        it('Tests if the entry to modify exists', finish => {
            chai
                .request(app)
                .put('/api/v1/entries/Success || /api/v1/entries/Happiness || /api/v1/entries/Worry')
                .send({ entry_title: 'Should work', posted: true, viewed: false, entry_content: 'Just the same process followed' })
                .end((error, response) => {
                    expect(response.status).to.equals(200);
                    expect(response.body).to.be.an('object');
                    finish();
                });
        });
        it('Test if the entry to modify does not exist', finish => {
            chai
                .request(app)
                .put('/api/v1/entries/:entry_title')
                .end((error, response) => {
                    expect(response.status).to.equals(404);
                    expect(response.body).to.be.an('object');
                    expect(response.body.message).to.equals('Entry not found');
                    expect(response.body.status).to.equals(404);
                    finish();
                });
        });
    });
    describe('Checks the deleting API endpoint', () => {
        it('Test if the entry to delete exists', finish => {
            chai
                .request(app)
                .delete('/api/v1/entries/Success || /api/v1/entries/Happiness || /api/v1/entries/Worry')
                .end((error, response) => {
                    expect(response.status).to.equals(200);
                    expect(response.body).to.be.an('object');
                    finish();
                });
        });
        it('Test if the entry to delete does not exist', finish => {
            chai
                .request(app)
                .delete('/api/v1/entries/:entry_title')
                .end((error, response) => {
                    expect(response.status).to.equals(404);
                    expect(response.body).to.be.an('object');
                    expect(response.body.message).to.equals('Entry not found');
                    expect(response.body.status).to.equals(404);
                    finish();
                });
        });
    });
});
