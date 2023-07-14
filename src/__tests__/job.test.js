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