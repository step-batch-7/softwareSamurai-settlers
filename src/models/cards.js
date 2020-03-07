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

  addResources(cards) {
    this.resources.add(cards);
  }
}

module.exports = Cards;
