const assert = require('assert');
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
});
