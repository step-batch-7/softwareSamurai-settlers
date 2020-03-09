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

  describe('getAvailableSettlements', () => {
    it('should give available settlements positions ', () => {
      const board = new Board();
      const expected = [
        'k1',
        'j1',
        'i2',
        'k2',
        'jk',
        'ij',
        'i1',
        'kl',
        'jkr',
        'ijq',
        'hi',
        'l1',
        'klr',
        'jqr',
        'hiq',
        'h1',
        'al',
        'lmr',
        'qrs',
        'hpq',
        'gh',
        'a1',
        'alm',
        'mrs',
        'pqs',
        'ghp',
        'g2',
        'a2',
        'abm',
        'mns',
        'ops',
        'fgp',
        'g1',
        'ab',
        'bmn',
        'nos',
        'fop',
        'fg',
        'b1',
        'bcn',
        'dno',
        'efo',
        'f1',
        'bc',
        'cdn',
        'deo',
        'ef',
        'c1',
        'cd',
        'de',
        'e2',
        'c2',
        'd1',
        'e1'
      ];
      const actual = board.getAvailableSettlements();
      assert.deepStrictEqual(expected, actual);
    });
  });

  describe('buildSettlement', () => {
    it('should remove settlement fro available settlements ', () => {
      const board = new Board();
      board.buildSettlement('k2');
      assert.notInclude(board.availableSettlements, 'k2');
    });
  });
  describe('getResource', () => {
    it('should give resource for the given Id', () => {
      const board = new Board();
      assert.strictEqual(board.getResource('a'), 'fields');
    });
  });

  describe('getEmptyPaths', () => {
    it('should give empty paths', () => {
      const board = new Board();
      const actual = board.getEmptyPaths();
      const expected = [
        'k1-k2',
        'jk-k1',
        'j1-jk',
        'ij-j1',
        'i2-ij',
        'i1-i2',
        'k2-kl',
        'jk-jkr',
        'ij-ijq',
        'hi-i1',
        'kl-l1',
        'kl-klr',
        'jkr-klr',
        'jkr-jqr',
        'ijq-jqr',
        'hiq-ijq',
        'hi-hiq',
        'h1-hi',
        'al-l1',
        'klr-lmr',
        'jqr-qrs',
        'hiq-hpq',
        'gh-h1',
        'a1-al',
        'al-alm',
        'alm-lmr',
        'lmr-mrs',
        'mrs-qrs',
        'pqs-qrs',
        'hpq-pqs',
        'ghp-hpq',
        'gh-ghp',
        'g2-gh',
        'a1-a2',
        'abm-alm',
        'mns-mrs',
        'ops-pqs',
        'fgp-ghp',
        'g1-g2',
        'a2-ab',
        'ab-abm',
        'abm-bmn',
        'bmn-mns',
        'mns-nos',
        'nos-ops',
        'fop-ops',
        'fgp-fop',
        'fg-fgp',
        'fg-g1',
        'ab-b1',
        'bcn-bmn',
        'dno-nos',
        'efo-fop',
        'f1-fg',
        'b1-bc',
        'bc-bcn',
        'bcn-cdn',
        'cdn-dno',
        'deo-dno',
        'deo-efo',
        'ef-efo',
        'ef-f1',
        'bc-c1',
        'cd-cdn',
        'de-deo',
        'e2-ef',
        'c1-c2',
        'c2-cd',
        'd1-cd',
        'd1-de',
        'de-e1',
        'e1-e2'
      ];
      assert.deepEqual(actual, expected);
    });
  });

  describe('addRoad', () => {
    it('should add road for given valid path and response with true', () => {
      const board = new Board();
      assert.isTrue(board.addRoad('k1-k2'));
    });
    it('should not add road for given invalid path and response with false', () => {
      const board = new Board();
      assert.isFalse(board.addRoad('wrongPath'));
    });
    it('should not add road for undefined path and response with false', () => {
      const board = new Board();
      assert.isFalse(board.addRoad('wrongPath'));
    });
  });
});
