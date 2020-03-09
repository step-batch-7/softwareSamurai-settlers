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
  describe('getTerrainsId', () => {
    it('should give terrains Id of the settlement', () => {
      const player = new Player();
      player.addSettlement('jkr');
      assert.deepStrictEqual(player.getTerrainsId(), ['j', 'k', 'r']);
    });
  });

  describe('canBuildSettlement', () => {
    it('should give true if player has resources to build settlement', () => {
      const player = new Player();
      player.addResources({ resource: 'wool', count: 2 });
      player.addResources({ resource: 'brick', count: 2 });
      player.addResources({ resource: 'lumber', count: 2 });
      player.addResources({ resource: 'grain', count: 2 });
      assert.isTrue(player.canBuildSettlement());
    });

    it('should give false if player has resources to build settlement', () => {
      const player = new Player();
      player.addResources({ resource: 'wool', count: 2 });
      player.addResources({ resource: 'brick', count: 2 });
      player.addResources({ resource: 'lumber', count: 2 });
      assert.isFalse(player.canBuildSettlement());
    });
  });

  describe('deductCardsForSettlement', () => {
    it('should deduct the cards needed to build settlement', () => {
      const player = new Player();
      player.addResources({ resource: 'wool', count: 1 });
      player.addResources({ resource: 'brick', count: 1 });
      player.addResources({ resource: 'lumber', count: 1 });
      player.addResources({ resource: 'grain', count: 2 });
      player.deductCardsForSettlement();
      assert.equal(player.resources.grain, 1);
      assert.equal(player.resources.lumber, 0);
      assert.equal(player.resources.brick, 0);
      assert.equal(player.resources.wool, 0);
    });
  });
});
