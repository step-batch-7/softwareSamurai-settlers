const { assert } = require('chai');

const Bank = require('../../src/models/bank');

describe('Bank', () => {
  describe('getBankStatus', () => {
    it('should return the status of the bank', () => {
      const bank = new Bank();
      const actual = bank.getBankStatus();
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
});
