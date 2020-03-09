const { Player } = require('./player');
const { Board } = require('./board');
const { Bank } = require('./bank');

const productions = {
  fields: 'grain',
  forest: 'lumber',
  hills: 'brick',
  pasture: 'wool',
  mountains: 'ore'
};

const pickTerrains = (terrains, numToken) => {
  const selectedTerrains = [];
  for (const terrain in terrains) {
    if (terrains[terrain]['noToken'] === numToken) {
      selectedTerrains.push(terrain);
    }
  }
  return selectedTerrains;
};

class Game {
  constructor() {
    this.board = new Board();
    this.bank = new Bank();
    this.player = new Player();
  }

  cardsCount() {
    return this.player.cardsCount();
  }

  resourceProduction(numToken) {
    const terrains = this.board.getTerrains();
    const selectedTerrains = pickTerrains(terrains, numToken);
    const terrainsId = this.player.getTerrainsId();
    const resourceId = terrainsId.filter(id => selectedTerrains.includes(id));
    const resourceCards = resourceId.map(id => {
      return { resource: productions[this.board.getResource(id)], count: 1 };
    });
    this.deal(resourceCards);
  }

  deal(resourceCards) {
    resourceCards.forEach(card => {
      if (this.bank.remove(card)) {
        this.player.addResources(card);
      }
    });
  }
  bankStatus() {
    return this.bank.status;
  }

  buildInitialSettlement(intersection) {
    this.board.buildSettlement(intersection);
    this.player.addSettlement(intersection);
  }

  buildSettlement(intersection) {
    this.board.buildSettlement(intersection);
    this.player.addSettlement(intersection);
    this.player.deductCardsForSettlement(intersection);
    this.bank.add({ grain: 1, lumber: 1, brick: 1, wool: 1 });
  }

  addResourcesToPlayer() {
    const terrains = this.board.getTerrains();
    const settlement = this.player.settlements.slice().pop();
    const tokenIds = settlement.split('');
    const resourceCards = tokenIds.reduce((resourceCards, tokenId) => {
      if (terrains[tokenId]) {
        const terrain = terrains[tokenId].resource;
        resourceCards.push({ resource: productions[terrain], count: 1 });
      }
      return resourceCards;
    }, []);
    resourceCards.forEach(resourceCard => {
      this.bank.remove(resourceCard);
      this.player.addResources(resourceCard);
    });
  }

  addRoad(pathId) {
    if (pathId) {
      const isRoadAddedToBoard = this.board.addRoad(pathId);
      const isRoadAddedToPlayer = this.player.addRoad(pathId);
      return isRoadAddedToBoard && isRoadAddedToPlayer;
    }
    return false;
  }

}

module.exports = { Game };
