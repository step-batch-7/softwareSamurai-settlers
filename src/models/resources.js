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

  deduct(resources) {
    const resourceNames = Object.keys(resources);
    const status = resourceNames.every(
      resource => this[resource] >= resources[resource]
    );
    if (status) {
      for (const resource in resources) {
        this[resource] -= resources[resource];
      }
    }
    return status;
  }

  get count() {
    return Object.values(this.status()).reduce((sum, count) => {
      return sum + count;
    }, 0);
  }
}

module.exports = Resources;
