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

  getMatchingTerrains(selectedTerrains) {
    let matchedTerrains = [];
    for (const terrain in selectedTerrains) {
      matchedTerrains = matchedTerrains.concat(
        this.settlements.reduce((matchedSettlements, settlement, index) => {
          if (this.settlements[index].includes(terrain)) {
            matchedSettlements.push(terrain);
          }
          return matchedSettlements;
        }, [])
      );
    }
    return matchedTerrains;
  }

  addResources(card) {
    if (card) {
      const isCardAdded = this.cards.addResources(card);
      return isCardAdded;
    }
    return false;
  }

  canBuildSettlement() {
    const resourcesNeeded = { grain: 1, brick: 1, lumber: 1, wool: 1 };
    return this.cards.haveResources(resourcesNeeded);
  }
}

module.exports = { Player };
