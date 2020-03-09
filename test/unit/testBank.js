const { assert } = require('chai');

const { Bank } = require('../../src/models/bank');

describe('Bank', () => {
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
  describe('haveResource', () => {
    it('should give true when bank have enough resources', () => {
      const bank = new Bank();
      assert.isTrue(bank.haveResource('ore', 1));
    });
    it('should give false when bank have not enough resources', () => {
      const bank = new Bank();
      assert.isFalse(bank.haveResource('ore', 20));
    });
  });
});
