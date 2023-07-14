const request = require('supertest')
const app = require('../app')

describe('GET jobs/unpaid', () => {
    it('It should return a list of unpaid jobs', async () => {
        await request(app)
        .get('/jobs/unpaid')
        .set('Accept', 'application/json')
        .set({'profile_id':'2'})
        .expect(200)
    })
});

describe('POST jobs/:job_id/pay', () => {
    it('It should return a confirmation object', async () => {
        await request(app)
        .post('/jobs/5/pay')
        .set('Accept', 'application/json')
        .set({'profile_id': '4'})
        .expect(200)
    })
});