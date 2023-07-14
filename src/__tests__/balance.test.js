const request = require('supertest')
const app = require('../app')

describe('POST balances/deposit/:userId', () => {
    it('It should return a confirmation object', async () => {
        await request(app)
        .post('/balances/deposit/2')
        .set('Accept', 'application/json')
        .set({'profile_id': '2'})
        .expect(200)
    })
});