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
  bankStatus(){
    return this.bank.status;
  }
}

module.exports = { Game };
