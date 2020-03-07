const request = require('supertest');
const { app } = require('../../src/app');

describe('Get static file', () => {
  it('Should redirected to catan page for /', done => {
    request(app)
      .get('/')
      .expect(302, done)
      .expect('Location', 'catan.html');
  });

  it('Should give catan page for catan.html ', done => {
    request(app)
      .get('/catan.html')
      .expect(200, done);
  });
});

describe('Get getTerrainDetails', () => {
  it('Should give terrain details for /terrains', done => {
    request(app)
      .get('/terrains')
      .expect(200, done)
      .expect(/"i":{"noToken":9,"resource":"forest"}/);
  });
});

describe('Get /cardsCount', () => {
  it('should give count of resource and devCards', done => {
    request(app)
      .get('/cardsCount')
      .expect(200, done)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });
});
