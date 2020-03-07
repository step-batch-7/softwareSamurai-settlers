const assert = require('assert');
const DevCards = require('../../src/models/devCards');

describe('DevCards', () => {
  describe('count', () => {
    it('should give count as zero of each devCard at initial stage', () => {
      const devCards = new DevCards();
      const expected = {
        knight: 0,
        yearOfPlenty: 0,
        roadBuilding: 0,
        monoPoly: 0
      };
      assert.deepStrictEqual(devCards.status(), expected);
    });
  });
  
  describe('totalCount', () => {
    it('should give total number of devCards', () => {
      const devCards = new DevCards();
      assert.strictEqual(devCards.count(), 0);
    });
  });
});
