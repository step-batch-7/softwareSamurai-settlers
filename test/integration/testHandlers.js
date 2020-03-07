const request = require('supertest');
const {app} = require('../../src/app');

describe('Get /cardsCount', () => {
  it('should give count of resource and devCards', done => {
    request(app)
      .get('/cardsCount')
      .expect(200, done)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });
});
