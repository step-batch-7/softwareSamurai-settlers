const { assert } = require('chai');
const { Sessions } = require('../../src/models/sessions');

describe('Sessions', () => {
  describe('getSession', () => {
    it('should get valid gameId and playerId for given id', () => {
      const sessions = new Sessions();
      const id = sessions.createSession(1000, 1);
      assert.deepStrictEqual(
        { gameId: 1000, playerId: 1 },
        sessions.getSession(id)
      );
    });
  });
});
