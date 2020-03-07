const Cards = require('./cards');

class Player {
  constructor() {
    this.settlements = [];
    this.cards = new Cards();
  }
  cardsCount() {
    return this.cards.count();
  }
  addSettlement(settlement) {
    this.settlements.push(settlement);
  }
  getSettlements() {
    return this.settlements;
  }
}

module.exports = {Player};
