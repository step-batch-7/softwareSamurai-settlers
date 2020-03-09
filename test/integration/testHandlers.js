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
      .get('/requestInitialSettlement')
      .expect(200, done)
      .expect(/k1/);
  });
});

describe('/getAdjAvailableSettlements', () => {
  it('should get empty array for no roads', done => {
    request(app)
      .get('/requestSettlement')
      .expect(200, done)
      .expect(/\[\]/);
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

describe('Get /buildRoad', () => {
  it('should build the Road on given position', done => {
    request(app)
      .post('/buildRoad')
      .set('content-type', 'application/json')
      .send({ pathId: 'k1-kj' })
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

  describe('Post /addResourcesToPlayer', () => {
    it('should give add resources to player for /addResourcesToPlayer', done => {
      request(app)
        .post('/addResourcesToPlayer')
        .expect(200, done);
    });
  });

  describe('get /getPossiblePathsForRoadInSetup', () => {
    it('should get possible paths for building a road for /getPossiblePathsForRoadInSetup', done => {
      request(app)
        .get('/getPossiblePathsForRoadInSetup')
        .expect(200, done);
    });
  });
});

describe('get /diceNumbers', () => {
  it('should random 2 dice numbers', done => {
    request(app)
      .get('/diceNumbers')
      .expect(200, done);
  });
});

describe('post /getResources', () => {
  it('should get resources if numberToken matches the terrain', done => {
    request(app)
      .post('/buildSettlement')
      .set('content-type', 'application/json')
      .send({ intersection: 'k1' })
      .expect(200, done);
  });

  it('should increase resources based on number token', done => {
    request(app)
      .post('/getResources')
      .set('content-type', 'application/json')
      .send({ numToken: 10 })
      .expect(200, done);
  });
});

describe('/buildStatus', () => {
  it('should give false if user cannot build settlement', done => {
    request(app)
      .get('/buildStatus')
      .expect(200, done)
      .expect(/"settlement":false/);
  });
});

describe('Get /getPossiblePathsForRoad', () => {
  it('Should give possible paths adjacent to existing settlements', done => {
    request(app)
      .get('/getPossiblePathsForRoad')
      .expect(200, done);
  });
});

describe('/buildInitialSettlement', () => {
  it('should build the settlement on given intersection', done => {
    request(app)
      .post('/buildInitialSettlement')
      .send({ intersection: 'k1' })
      .expect(200, done);
  });
});
