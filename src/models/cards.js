const Resources = require('./resources');
const DevCards = require('./devCards');

class Cards {
  constructor() {
    this.resources = new Resources();
    this.devCards = new DevCards();
  }
  count() {
    return {
      resources: this.resources.status(),
      devCards: this.devCards.status(),
      totalDevCards: this.devCards.count()
    };
  }

  addResources(card) {
    return this.resources.add(card);
  }

  haveResources(resources) {
    return this.resources.have(resources);
  }

  deductResources(resources) {
    this.resources.deduct(resources);
  }
}

module.exports = Cards;
