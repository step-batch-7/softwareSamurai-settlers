/* eslint-disable id-length */
const { assert } = require('chai');
const { Board } = require('../../src/models/board');

describe('Board class', () => {
  describe('getTerrains', () => {
    const board = new Board();
    it('should get all the terrains with id and type of resource it produces', () => {
      const expectedTerrains = {
        a: { noToken: 9, resource: 'grain' },
        b: { noToken: 8, resource: 'lumber' },
        c: { noToken: 5, resource: 'brick' },
        d: { noToken: 6, resource: 'grain' },
        e: { noToken: 11, resource: 'wool' },
        f: { noToken: 5, resource: 'wool' },
        g: { noToken: 8, resource: 'ore' },
        h: { noToken: 10, resource: 'brick' },
        i: { noToken: 9, resource: 'lumber' },
        j: { noToken: 2, resource: 'wool' },
        k: { noToken: 10, resource: 'ore' },
        l: { noToken: 12, resource: 'grain' },
        m: { noToken: 11, resource: 'lumber' },
        n: { noToken: 3, resource: 'brick' },
        o: { noToken: 4, resource: 'grain' },
        p: { noToken: 3, resource: 'lumber' },
        q: { noToken: 4, resource: 'wool' },
        r: { noToken: 6, resource: 'brick' },
        s: { noToken: 'sand', resource: 'sand' }
      };

      const actualTerrains = board.getTerrains();

      assert.deepStrictEqual(expectedTerrains, actualTerrains);
    });
  });
});
