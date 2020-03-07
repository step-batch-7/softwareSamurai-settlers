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

describe('getAvailableSettlements', () => {
  it('should give all the available settlements ', done => {
    request(app)
      .get('/requestSettlement')
      .expect(200, done)
      .expect(/k1/);
  });
});

describe('buildSettlement', () => {
  it('should build the settlement on given position', done => {
    request(app)
      .post('/buildSettlement')
      .set('content-type', 'application/json')
      .send({ intersection: 'k1' })
      .expect(200, done);
  });
});

describe('Get /cardsCount', () => {
  it('should give count of resource and devCards', done => {
    request(app)
      .get('/cardsCount')
      .expect(200, done)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });

  describe('Get /bankStatus', () => {
    it('should give bank status for /bankStatus', done => {
      request(app)
        .get('/bankStatus')
        .expect(200, done)
        .expect('Content-Type', 'application/json; charset=utf-8');
    });
  });
});
