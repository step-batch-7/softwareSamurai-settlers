const { assert } = require('chai');
const { GameList } = require('../../src/models/gameList');
const { Game } = require('./../../src/models/game');

describe('GameList', () => {
  describe('generateGameId', () => {
    const gameList = new GameList();

    it('should generateGameId as 1000', () => {
      assert.strictEqual(gameList.generateGameId(), 1000);
    });
  });

  describe('createGame', () => {
    it('should createGame with id 1000', () => {
      const gameList = new GameList();
      assert.strictEqual(gameList.createGame(), 1000);
    });
  });

  describe('getGame', () => {
    it('should return the game with given id', () => {
      const gameList = new GameList();
      const gameId = gameList.createGame('john');
      assert.deepStrictEqual(gameList.games[gameId], gameList.getGame(gameId));
    });
  });

  describe('isGameAvailable', () => {
    it('should give true when the game is available', () => {
      const gameList = new GameList();
      const gameId = gameList.createGame('john');
      assert.isTrue(gameList.isGameAvailable(gameId));
    });

    it('should give false when the game is not available', () => {
      const gameList = new GameList();
      const gameId = gameList.createGame('john');
      gameList.games[gameId].addPlayer('john');
      gameList.games[gameId].addPlayer('john');
      gameList.games[gameId].addPlayer('john');
      gameList.games[gameId].addPlayer('john');
      assert.isUndefined(gameList.isGameAvailable(gameId));
    });
  });
});
