const sinon = require('sinon');
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
  describe('add', () => {
    it('should not add resources to the bank', () => {
      const bank = new Bank();
      assert.isFalse(bank.add({ lumber: 1, brick: 1 }));
    });
    it('should add resources to the bank', () => {
      const bank = new Bank();
      bank.remove({ resource: 'lumber', count: 1 });
      assert.isTrue(bank.add({ lumber: 1 }));
    });
  });

  describe('getDevCard', () => {
    it('should return devCard name', () => {
      const bank = new Bank();
      sinon.replace(Math, 'random', () => 0);
      assert.strictEqual(bank.getDevCard(), 'knights');
      sinon.restore();
    });
    it('should return undefined when development cards are empty', () => {
      const bank = new Bank();
      sinon.replace(Math, 'random', () => 0);
      bank.developmentCards[0]['knights'] = 0;
      assert.isUndefined(bank.getDevCard());
      sinon.restore();
    });
  });
});
