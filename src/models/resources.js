class Resources {
  constructor() {
    this.ore = 0;
    this.wool = 0;
    this.lumber = 0;
    this.brick = 0;
    this.grain = 0;
  }
  count() {
    return {
      ore: this.ore,
      wool: this.wool,
      lumber: this.lumber,
      brick: this.brick,
      grain: this.grain
    };
  }
}

module.exports = Resources;
