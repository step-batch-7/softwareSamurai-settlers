const { assert } = require('chai');
const { Player } = require('../../src/models/player');

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
  describe('addResources', () => {
    it('should add given resources to existing resources and return true for valid resources', () => {
      const player = new Player();
      assert.isTrue(player.addResources({ resource: 'wool', count: 2 }));
    });

    it('should not add given resources if given resources is undefined', () => {
      const player = new Player();
      assert.isFalse(player.addResources());
    });

    it('should not add given resources if given resources is not valid', () => {
      const player = new Player();
      assert.isFalse(player.addResources('wrong'));
    });
  });
});
