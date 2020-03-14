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
      return { gameId: 1000, playerId: 1 };
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

  context('getAvailableSettlements', () => {
    it('should give all the available settlements ', done => {
      request(app)
        .get('/catan/requestInitialSettlement')
        .expect(200, done)
        .expect(/k1/);
    });
  });

  describe('buildSettlement', () => {
    it('should build the settlement on given position', done => {
      request(app)
        .post('/catan/buildSettlement')
        .set('content-type', 'application/json')
        .send({ intersection: 'k1' })
        .expect(200, done);
    });
  });

  describe('/getAdjAvailableSettlements', () => {
    it('should get empty array for no roads', done => {
      request(app)
        .get('/catan/requestSettlement')
        .expect(200, done)
        .expect(/\[\]/);
    });
  });
  describe('Get /buildRoad', () => {
    it('should build the Road on given position', done => {
      request(app)
        .post('/catan/buildRoad')
        .set('content-type', 'application/json')
        .send({ pathId: 'k1-kj' })
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

  context('post /resourceProduction', () => {
    it('should get resources if numberToken matches the terrain', done => {
      request(app)
        .post('/catan/buildSettlement')
        .set('content-type', 'application/json')
        .send({ intersection: 'k1' })
        .expect(200, done);
    });
  });

  describe('get /resourceProduction', () => {
    it('should increase resources based on number token', done => {
      request(app)
        .get('/catan/resourceProduction')
        .expect('content-type', 'application/json; charset=utf-8')
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
        .expect(302, done);
    });
  });

  context('/gameStatus', () => {
    it('should give the game status for the given playerId', done => {
      request(app)
        .get('/catan/gameStatus')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
    });
  });
  context('Get /diceRolledStatus', () => {
    it('should give diceRolled status for /getDiceRolledStatus', done => {
      request(app)
        .get('/catan/diceRolledStatus')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(/diceRolledStatus/)
        .expect(200, done);
    });
  });
  context('Post /buildRoadWithResources', () => {
    it('should add road using resources', done => {
      request(app)
        .post('/catan/buildRoadWithResources')
        .send('k1-k2')
        .expect(200, done);
    });
  });
  context('get /serveLoadGame', () => {
    it('should give the current game status', done => {
      request(app)
        .get('/catan/loadGame')
        .expect(200, done);
    });
  });
  context('get /endTurn', () => {
    it('should end the turn of the player', done => {
      request(app)
        .get('/catan/endTurn')
        .expect(200, done);
    });
  });
  context('post /joinGame', () => {
    it('should join game when the game is not started', done => {
      const game = new Game();
      game.addPlayer('virat');
      game.addPlayer('rohit');
      game.addPlayer('shikhar');
      game.addPlayer('dhoni');
      sinon.replace(app.locals, 'game', game);
      app.locals.playerId = 1;
      request(app)
        .get('/catan/endTurn')
        .expect(200, done);
    });
  });

  describe('Get /possiblePositionsForCity', () => {
    it('Should give possible Positions for building city', done => {
      request(app)
        .get('/catan/possiblePositionsForCity')
        .expect(200, done);
    });
  });

  describe('buildCity', () => {
    it('should build the city on given position', done => {
      request(app)
        .post('/catan/buildCity')
        .set('content-type', 'application/json')
        .send({ intersection: 'k1' })
        .expect(200, done);
    });
  });
});
