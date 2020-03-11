const { assert } = require('chai');
const { GameList } = require('../../src/models/gameList');

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
      gameList.getGame(1000);
    });
  });
});
