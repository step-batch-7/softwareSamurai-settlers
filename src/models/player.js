const Resources = require('./resources');
const DevCards = require('./devCards');

class Player {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.settlements = [];
    this.roads = [];
    this.resources = new Resources();
    this.devCards = new DevCards();
    this.victoryPoints = 0;
    this.army = 0;
    this.longestRoad = 0;
    this.turn = false;
  }

  cardsCount() {
    return {
      resources: this.resources.status(),
      devCards: this.devCards.status(),
      totalDevCards: this.devCards.count()
    };
  }

  addVictoryPoints(points) {
    if (points && Number.isInteger(points)) {
      this.victoryPoints += points;
      return true;
    }
    return false;
  }

  addSettlement(settlement) {
    this.addVictoryPoints(1);
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
    return this.resources.deduct(settlementResources);
  }

  deductCardsForRoad() {
    const roadResources = { lumber: 1, brick: 1 };
    return this.resources.deduct(roadResources);
  }

  getLastSettlementTerrains() {
    const settlements = this.getSettlements();
    if (settlements.length !== 0) {
      return settlements.pop().split('');
    }
    return [];
  }

  get status() {
    return {
      name: this.name,
      color: this.color,
      settlements: this.settlements,
      roads: this.roads,
      resources: this.resources.status(),
      resourceCount: this.resources.count,
      devCards: this.devCards.status(),
      devCardCount: this.devCards.count(),
      victoryPoints: this.victoryPoints,
      army: this.army,
      longestRoad: this.longestRoad,
      turn: this.turn
    };
  }

  get abstractStatus() {
    return {
      name: this.name,
      color: this.color,
      settlements: this.settlements,
      roads: this.roads,
      resourceCount: this.resources.count,
      devCardCount: this.devCards.count(),
      victoryPoints: this.victoryPoints - this.devCards.victoryCardsCount,
      army: this.army,
      longestRoad: this.longestRoad,
      turn: this.turn
    };
  }

  startTurn() {
    if (!this.turn) {
      this.turn = true;
      return true;
    }
    return false;
  }

  endTurn() {
    if (this.turn) {
      this.turn = false;
      return true;
    }
    return false;
  }

  canBuildCity() {
    const resourcesNeeded = { grain: 2, ore: 3 };
    return this.resources.have(resourcesNeeded);
  }
}

module.exports = { Player };
