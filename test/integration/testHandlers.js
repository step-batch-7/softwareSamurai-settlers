const request = require('supertest');
const sinon = require('sinon');
const { app } = require('../../src/app');
const { Game } = require('../../src/models/game');

describe('Handlers', () => {
  before(() => {
    const game = new Game();
    game.addPlayer('virat');
    game.addPlayer('rohit');
    game.addPlayer('shikhar');
    game.addPlayer('dhoni');
    sinon.replace(app.locals.sessions, 'getSession', () => {
      return { gameId: 100, playerId: 1 };
    });

    sinon.replace(app.locals.gameList, 'getGame', () => game);
  });

  context('/joinedPlayersDetails', () => {
    it('should give the details of joined players', done => {
      request(app)
        .get('/catan/joinedPlayerDetails')
        .set('cookie', 'sId=100')
        .expect(200, done)
        .expect(/"blue":"virat"/);
    });
  });

  context('Get static file', () => {
    it('Should give catan page for catan.html ', done => {
      request(app)
        .get('/catan/home.html')
        .expect(200, done);
    });
  });

  context('Get getTerrainDetails', () => {
    it('Should give terrain details for /terrains', done => {
      request(app)
        .get('/catan/terrains')
        .set('cookie', 'sId = 1234')
        .expect(200, done)
        .expect(/"i":{"noToken":9,"resource":"forest"}/);
    });
  });

  context('getAvailableSettlements', () => {
    it('should give all the available settlements ', done => {
      request(app)
        .get('/catan/requestInitialSettlement')
        .expect(200, done)
        .expect(/k1/);
    });
  });

  context('/getAdjAvailableSettlements', () => {
    it('should get empty array for no roads', done => {
      request(app)
        .get('/catan/requestSettlement')
        .expect(200, done)
        .expect(/\[\]/);
    });
  });

  context('buildSettlement', () => {
    it('should build the settlement on given position', done => {
      request(app)
        .post('/catan/buildSettlement')
        .set('content-type', 'application/json')
        .send({ intersection: 'k1' })
        .expect(200, done);
    });
  });

  context('Get /buildRoad', () => {
    it('should build the Road on given position', done => {
      request(app)
        .post('/catan/buildRoad')
        .set('content-type', 'application/json')
        .send({ pathId: 'k1-kj' })
        .expect(200, done);
    });
  });

  context('Get /cardsCount', () => {
    it('should give count of resource and devCards', done => {
      request(app)
        .get('/catan/cardsCount')
        .expect(200, done)
        .expect('Content-Type', 'application/json; charset=utf-8');
    });

    context('Get /bankStatus', () => {
      it('should give bank status for /bankStatus', done => {
        request(app)
          .get('/catan/bankStatus')
          .expect(200, done)
          .expect('Content-Type', 'application/json; charset=utf-8');
      });
    });

    context('Post /addResourcesToPlayer', () => {
      it('should give add resources to player for /addResourcesToPlayer', done => {
        request(app)
          .post('/catan/addResourcesToPlayer')
          .expect(200, done);
      });
    });

    context('get /getPossiblePathsForRoadInSetup', () => {
      it('should get possible paths for building a road for /getPossiblePathsForRoadInSetup', done => {
        request(app)
          .get('/catan/getPossiblePathsForRoadInSetup')
          .expect(200, done);
      });
    });
  });

  context('get /diceNumbers', () => {
    it('should random 2 dice numbers', done => {
      request(app)
        .get('/catan/diceNumbers')
        .expect(200, done);
    });
  });

  context('post /resourceProduction', () => {
    it('should get resources if numberToken matches the terrain', done => {
      request(app)
        .post('/catan/buildSettlement')
        .set('content-type', 'application/json')
        .send({ intersection: 'k1' })
        .expect(200, done);
    });

    it('should increase resources based on number token', done => {
      request(app)
        .post('/catan/resourceProduction')
        .set('content-type', 'application/json')
        .send({ numToken: 10 })
        .expect(200, done);
    });
  });

  context('/buildStatus', () => {
    it('should give false if user cannot build settlement', done => {
      request(app)
        .get('/catan/buildStatus')
        .expect(200, done)
        .expect(/"settlement":false/);
    });
  });

  context('Get /getPossiblePathsForRoad', () => {
    it('Should give possible paths adjacent to existing settlements', done => {
      request(app)
        .get('/catan/getPossiblePathsForRoad')
        .expect(200, done);
    });
  });

  context('/buildInitialSettlement', () => {
    it('should build the settlement on given intersection', done => {
      request(app)
        .post('/catan/buildInitialSettlement')
        .send({ intersection: 'k1' })
        .expect(200, done);
    });
  });

  context('/host', () => {
    it('should host the game and redirect to the /waitingPage', done => {
      request(app)
        .post('/host')
        .expect(302, done);
    });
  });

  context('/waiting.html', () => {
    it('should give waiting page for given ', done => {
      request(app)
        .get('/catan/waiting.html')
        .expect(200, done);
    });
  });

  context('/join', () => {
    it('should join go to the waiting page if gameId is valid', done => {
      request(app)
        .post('/join')
        .expect(200, done);
    });
  });
});
