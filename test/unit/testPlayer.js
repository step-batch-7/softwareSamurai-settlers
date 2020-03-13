const { assert } = require('chai');
const sinon = require('sinon');
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
  describe('addRoad', () => {
    it('should give true if the road is present', () => {
      const player = new Player();
      player.addResources({ resource: 'brick', count: 1 });
      player.addResources({ resource: 'lumber', count: 1 });
      assert.isTrue(player.addRoad('a1-al'));
      assert.deepStrictEqual(player.roads, ['a1-al']);
    });

    it('should give false if road is not present', () => {
      const player = new Player();
      player.addResources({ resource: 'brick', count: 1 });
      player.addResources({ resource: 'lumber', count: 1 });
      assert.isFalse(player.addRoad());
      assert.deepStrictEqual(player.roads, []);
    });
  });
  describe('addVictoryPoint', () => {
    it('should add victory point to player', () => {
      const player = new Player();
      assert.isTrue(player.addVictoryPoints(1));
    });
    it('should not add victory point to player when points are not given', () => {
      const player = new Player();
      assert.isFalse(player.addVictoryPoints());
    });
  });
  describe('getLastSettlementTerrains', function() {
    it('should return the terrains of settlement when there is atleast a settlement', function() {
      const player = new Player();
      sinon.replace(player, 'getSettlements', () => ['abc', 'def']);
      const actual = player.getLastSettlementTerrains();
      assert.deepStrictEqual(actual, ['d', 'e', 'f']);
    });

    it('should return empty when there is no settlement', function() {
      const player = new Player();
      sinon.replace(player, 'getSettlements', () => []);
      const actual = player.getLastSettlementTerrains();
      assert.deepStrictEqual(actual, []);
    });
  });

  describe('deductCardsForRoad', function() {
    it('should give true when the cards for road are deducted', function() {
      const player = new Player();
      player.addResources({ resource: 'lumber', count: 1 });
      player.addResources({ resource: 'brick', count: 1 });
      assert.isTrue(player.deductCardsForRoad());
    });
    it('should give false when the cards for road are not deducted', function() {
      const player = new Player();
      assert.isFalse(player.deductCardsForRoad());
    });
  });

  describe('startTurn', function() {
    it('should toggle the players turn status', function() {
      const player = new Player();
      assert.isTrue(player.startTurn());
    });
    it('should toggle the players turn status', function() {
      const player = new Player();
      player.startTurn();
      assert.isFalse(player.startTurn());
    });
  });

  describe('canBuildCity', () => {
    it('should give true if player has resources to build city', () => {
      const player = new Player();
      player.addResources({ resource: 'ore', count: 3 });
      player.addResources({ resource: 'grain', count: 2 });
      assert.isTrue(player.canBuildCity());
    });
    it('should give false if player has not enough resources to build city', () => {
      const player = new Player();
      player.addResources({ resource: 'grain', count: 2 });
      assert.isFalse(player.canBuildCity());
    });
  });
});
