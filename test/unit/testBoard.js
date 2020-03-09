/* eslint-disable id-length */
const {assert} = require('chai');
const {Board} = require('../../src/models/board');

describe('Board class', () => {
  describe('getTerrains', () => {
    const board = new Board();
    it('should get terrains information', () => {
      const expectedTerrains = {
        a: {noToken: 9, resource: 'fields'},
        b: {noToken: 8, resource: 'forest'},
        c: {noToken: 5, resource: 'hills'},
        d: {noToken: 6, resource: 'fields'},
        e: {noToken: 11, resource: 'pasture'},
        f: {noToken: 5, resource: 'pasture'},
        g: {noToken: 8, resource: 'mountains'},
        h: {noToken: 10, resource: 'hills'},
        i: {noToken: 9, resource: 'forest'},
        j: {noToken: 2, resource: 'pasture'},
        k: {noToken: 10, resource: 'mountains'},
        l: {noToken: 12, resource: 'fields'},
        m: {noToken: 11, resource: 'forest'},
        n: {noToken: 3, resource: 'hills'},
        o: {noToken: 4, resource: 'fields'},
        p: {noToken: 3, resource: 'forest'},
        q: {noToken: 4, resource: 'pasture'},
        r: {noToken: 6, resource: 'mountains'},
        s: {noToken: '', resource: 'desert'}
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
});
