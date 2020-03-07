const assert = require('assert');
const {Player} = require('../../src/models/player');

describe('Player', () => {
  describe('cardsCount', () => {
    it('should give card count of the player', () => {
      const player = new Player();
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
      assert.deepStrictEqual(player.cardsCount(), expected);
    });
  });
});
