/* eslint-disable id-length */
const { assert } = require('chai');
const { Board } = require('../../src/models/board');

describe('Board class', () => {
  describe('getTerrains', () => {
    const board = new Board();
    it('should get terrains information', () => {
      const expectedTerrains = {
        a: { noToken: 9, resource: 'fields' },
        b: { noToken: 8, resource: 'forest' },
        c: { noToken: 5, resource: 'hills' },
        d: { noToken: 6, resource: 'fields' },
        e: { noToken: 11, resource: 'pasture' },
        f: { noToken: 5, resource: 'pasture' },
        g: { noToken: 8, resource: 'mountains' },
        h: { noToken: 10, resource: 'hills' },
        i: { noToken: 9, resource: 'forest' },
        j: { noToken: 2, resource: 'pasture' },
        k: { noToken: 10, resource: 'mountains' },
        l: { noToken: 12, resource: 'fields' },
        m: { noToken: 11, resource: 'forest' },
        n: { noToken: 3, resource: 'hills' },
        o: { noToken: 4, resource: 'fields' },
        p: { noToken: 3, resource: 'forest' },
        q: { noToken: 4, resource: 'pasture' },
        r: { noToken: 6, resource: 'mountains' },
        s: { noToken: '', resource: 'desert' }
      };

      const actualTerrains = board.getTerrains();

      assert.deepStrictEqual(expectedTerrains, actualTerrains);
    });
  });
});
