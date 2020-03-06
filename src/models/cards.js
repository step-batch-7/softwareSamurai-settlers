const Resources = require('./resources');
const DevCards = require('./devCards');

class Cards {
  constructor() {
    this.resources = new Resources();
    this.devCards = new DevCards();
  }
  count() {
    return {
      resources: this.resources.count(),
      devCards: this.devCards.count(),
      totalDevCards: this.devCards.totalCards()
    };
  }
}

module.exports = Cards;
