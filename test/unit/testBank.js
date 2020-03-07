const { assert } = require('chai');

const Bank = require('../../src/models/bank');

describe('Bank', () => {
  describe('getBankStatus', () => {
    it('should return the status of the bank', () => {
      const bank = new Bank();
      const actual = bank.status;
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

  describe('remove', () => {
    it('should remove given resources from bank resources and return true for valid given resources', () => {
      const bank = new Bank();
      assert.isTrue(bank.remove({ resource: 'wool', count: 1 }));
    });

    it('should not remove given resources from bank resources and return false for count is undefined', () => {
      const bank = new Bank();
      assert.isFalse(bank.remove({ resource: 'wool' }));
    });

    it('should not remove given resources from bank resources and return false for resource is undefined', () => {
      const bank = new Bank();
      assert.isFalse(bank.remove({ count: 1 }));
    });
  });
});
