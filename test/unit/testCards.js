const assert = require('assert');
const Cards = require('../../src/models/cards');

describe('Cards', () => {
  describe('count', () => {
    it('should give count as zero of each card at initial stage', () => {
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
          monoPoly: 0,
          victoryCards: {
            library: 0,
            chapel: 0,
            greatHall: 0,
            market: 0,
            university: 0
          }
        },
        totalDevCards: 0
      };
      const cards = new Cards();
      assert.deepStrictEqual(cards.count(), expected);
    });
  });
});
