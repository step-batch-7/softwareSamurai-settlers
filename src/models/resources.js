class Resources {
  constructor() {
    this.ore = 0;
    this.wool = 0;
    this.lumber = 0;
    this.brick = 0;
    this.grain = 0;
  }
  status() {
    return {
      ore: this.ore,
      wool: this.wool,
      lumber: this.lumber,
      brick: this.brick,
      grain: this.grain
    };
  }

  add({ resource, count }) {
    if (resource && count) {
      this[resource] = this[resource] + count;
      return true;
    }
    return false;
  }

  have(resources) {
    const areEnough = Object.keys(resources).every(resource => {
      return this[resource] >= resources[resource];
    });
    return areEnough;
  }
}

module.exports = Resources;
