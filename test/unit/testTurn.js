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

  describe('setupNext', function() {
    it('should give next player Id for setup ', function() {
      const turn = new Turn(['p-1', 'p-2', 'p-3', 'p-4']);
      assert.strictEqual(turn.setupNext(), 'p-2');
    });
  });

  describe('changeTurn', function() {
    it('should give next player id based setup order ', function() {
      const turn = new Turn(['p-1', 'p-2', 'p-3', 'p-4']);
      assert.strictEqual(turn.changeTurn('setup'), 'p-2');
    });

    it('should give next player id based normal order ', function() {
      const turn = new Turn(['p-1', 'p-2', 'p-3', 'p-4']);
      assert.strictEqual(turn.changeTurn('normal'), 'p-2');
    });
  });
});
