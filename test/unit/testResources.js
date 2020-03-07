const { assert } = require('chai');
const Resources = require('../../src/models/resources');

describe('Resources', () => {
  describe('count', () => {
    it('should give count as zero of each resources at initial stage', () => {
      const resources = new Resources();
      const expected = {
        ore: 0,
        wool: 0,
        lumber: 0,
        brick: 0,
        grain: 0
      };
      assert.deepStrictEqual(resources.status(), expected);
    });
  });
});
