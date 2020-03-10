const assert = require('assert');
const { Turn } = require('../../src/models/turn');

describe('Turn', function() {
  describe('currentPlayer', function() {
    it('should give the current player Id', function() {
      const turn = new Turn(['p-1', 'p-2', 'p-3', 'p-4']);
      assert.strictEqual(turn.currentPlayerId, 'p-1');
    });
  });
  describe('next', function() {
    it('should give next player Id ', function() {
      const turn = new Turn(['p-1', 'p-2', 'p-3', 'p-4']);
      assert.strictEqual(turn.next(), 'p-2');
    });
  });
});
