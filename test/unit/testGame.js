const { assert } = require('chai');
const sinon = require('sinon');
const { Game } = require('../../src/models/game');

describe('Game', () => {
  describe('cardsCount', () => {
    it('should give cardsCount for the given player', () => {
      const game = new Game();
      const expected = {
        resources: {
          ore: 0,
          wool: 0,
          lumber: 0,
          brick: 0,
          grain: 0
        },
        devCards: {
          knight: 0,
          yearOfPlenty: 0,
          roadBuilding: 0,
          monoPoly: 0
        },
        totalDevCards: 0
      };
      assert.deepStrictEqual(game.cardsCount(), expected);
    });
  });

  describe('bankStatus', () => {
    it('should return the status of the bank', () => {
      const game = new Game();
      const actual = game.bankStatus();
      const expected = {
        lumber: 19,
        brick: 19,
        ore: 19,
        wool: 19,
        grain: 19,
        developmentCards: 25
      };
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('addRoad', () => {
    it('should add the road to Game when pathId is valid', () => {
      const game = new Game();
      assert.isTrue(game.addRoad('kl-klr'));
    });

    it('should not add the road to Game when pathId is undefined ', () => {
      const game = new Game();
      assert.isFalse(game.addRoad());
    });

    it('should not add the road to Game when pathId is invalid ', () => {
      const game = new Game();
      assert.isFalse(game.addRoad('abc-def'));
    });
  });

  describe('getAvailableAdjSettlements ', () => {
    it('should give empty array if no positions are available', () => {
      const game = new Game();
      assert.deepStrictEqual(game.getAvailableAdjSettlements(), []);
    });
  });
  describe('start', () => {
    it('should start the game', () => {
      const players = { p1: 'red', p2: 'green', p3: 'orange', p4: 'white' };
      const game = new Game();
      sinon.replace(game, 'players', players);
      assert.isTrue(game.start());
    });

    it('should not start the game', () => {
      const game = new Game();
      assert.isFalse(game.start());
    });
  });
});
