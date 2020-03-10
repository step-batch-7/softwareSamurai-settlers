const Resources = require('./resources');
const DevCards = require('./devCards');

class Player {
  constructor() {
    this.settlements = [];
    this.roads = [];
    this.resources = new Resources();
    this.devCards = new DevCards();
  }
  cardsCount() {
    return {
      resources: this.resources.status(),
      devCards: this.devCards.status(),
      totalDevCards: this.devCards.count()
    };
  }
  addSettlement(settlement) {
    this.settlements.push(settlement);
  }
  addRoad(road) {
    if (road) {
      this.roads.push(road);
      return true;
    }
    return false;
  }

  getSettlements() {
    return this.settlements.slice();
  }
  getRoads() {
    return this.roads.slice();
  }
  getTerrainsId() {
    return this.settlements.reduce((terrainsId, settlement) => {
      return terrainsId.concat(settlement.split(''));
    }, []);
  }
  addResources(card) {
    if (card) {
      const isCardAdded = this.resources.add(card);
      return isCardAdded;
    }
    return false;
  }
  canBuildSettlement() {
    const resourcesNeeded = { grain: 1, brick: 1, lumber: 1, wool: 1 };
    return this.resources.have(resourcesNeeded);
  }

  canBuildRoad() {
    const resourcesNeeded = { brick: 1, lumber: 1 };
    return this.resources.have(resourcesNeeded);
  }

  deductCardsForSettlement() {
    const settlementResources = { grain: 1, lumber: 1, brick: 1, wool: 1 };
    this.resources.deduct(settlementResources);
  }

  deductCardsForRoad() {
    const roadResources = { lumber: 1, brick: 1 };
    return this.resources.deduct(roadResources);
  }
}

module.exports = { Player };
