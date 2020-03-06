class Board {
  constructor() {
    this.terrainIds = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's'
    ];
    this.resourceTypes = [
      { noToken: 9, resource: 'grain' },
      { noToken: 8, resource: 'lumber' },
      { noToken: 5, resource: 'brick' },
      { noToken: 6, resource: 'grain' },
      { noToken: 11, resource: 'wool' },
      { noToken: 5, resource: 'wool' },
      { noToken: 8, resource: 'ore' },
      { noToken: 10, resource: 'brick' },
      { noToken: 9, resource: 'lumber' },
      { noToken: 2, resource: 'wool' },
      { noToken: 10, resource: 'ore' },
      { noToken: 12, resource: 'grain' },
      { noToken: 11, resource: 'lumber' },
      { noToken: 3, resource: 'brick' },
      { noToken: 4, resource: 'grain' },
      { noToken: 3, resource: 'lumber' },
      { noToken: 4, resource: 'wool' },
      { noToken: 6, resource: 'brick' },
      { noToken: 'sand', resource: 'sand' }
    ];
    this.terrains = {};
  }

  getTerrains() {
    this.terrainIds.forEach((id, index) => {
      this.terrains[id] = this.resourceTypes[index];
    });
    return this.terrains;
  }
}

module.exports = { Board };
