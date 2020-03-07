const Cards = require('./cards');

class Player {
  constructor() {
    this.settlements = [];
    this.roads = [];
    this.cards = new Cards();
  }
  cardsCount() {
    return this.cards.count();
  }
  addSettlement(settlement) {
    this.settlements.push(settlement);
  }
  addRoad(road) {
    this.roads.push(road);
  }
  getSettlements() {
    return this.settlements.slice();
  }
  getRoads() {
    return this.roads.slice();
  }

  getMatchingSettlements(selectedTerrains) {
    const matchedSettlements = [];
    for (const terrain in selectedTerrains) {
      for (let index = 0; index < this.settlements.length; index++) {
        if (this.settlements[index].includes(terrain)) {
          matchedSettlements.push(terrain);
        }
      }
    }
    return matchedSettlements;
  }

  addResources(card) {
    if (card) {
      const isCardAdded = this.cards.addResources(card);
      return isCardAdded;
    }
    return false;
  }
}

module.exports = {Player};
