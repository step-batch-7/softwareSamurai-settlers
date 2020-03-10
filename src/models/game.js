const { Player } = require('./player');
const { Board } = require('./board');
const { Bank } = require('./bank');
const { Turn } = require('./turn');

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

const isIntersectionIncluded = (path, intersection) => {
  return path.split('-').includes(intersection);
};

const isRoadIncluded = (path, road) => {
  return path.split('-').some(isIntersectionIncluded.bind(null, road));
};

class Game {
  constructor() {
    this.board = new Board();
    this.bank = new Bank();
    this.player = new Player();
    this.players = {};
    this.players = [];
    this.turn = new Turn(['p-1', 'p-2', 'p-3', 'p-4']);
  }

  cardsCount() {
    return this.player.cardsCount();
  }

  addPlayer() {
    this.players.push(new Player());
  }

  getBoardData() {
    return {
      terrainsInfo: this.board.getTerrains(),
      settlements: this.player.getSettlements(),
      roads: this.player.getRoads()
    };
  }

  getAvailableSettlements() {
    return this.board.getAvailableSettlements();
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

  possiblePathsForSetup() {
    const settlement = this.player.settlements.slice().pop();
    const possiblePositionsForRoad = this.board.getEmptyPaths();
    const possiblePositionsToBuildRoad = possiblePositionsForRoad.filter(
      position => {
        return position
          .split('-')
          .some(intersection => settlement === intersection);
      }
    );
    return possiblePositionsToBuildRoad;
  }

  possiblePaths() {
    const paths = this.board.getEmptyPaths();
    const roads = this.player.getRoads();
    const settlements = this.player.getSettlements();
    const possiblePaths = paths.filter(path => {
      const isPathConnectedToRoad = roads.some(isRoadIncluded.bind(null, path));
      const isPathConnectedToSettlement = settlements.some(settlement => {
        return isIntersectionIncluded(path, settlement);
      });
      return isPathConnectedToRoad || isPathConnectedToSettlement;
    });
    return possiblePaths;
  }

  canBuild() {
    const canBuildSettlement = this.player.canBuildSettlement();
    const canBuildRoad = this.player.canBuildRoad();
    const havePositionsToBuildSettlements =
      this.getAvailableAdjSettlements().length > 0;
    return {
      settlement: canBuildSettlement && havePositionsToBuildSettlements,
      road: canBuildRoad
    };
  }

  getAvailableAdjSettlements() {
    const settlements = this.getAvailableSettlements();
    const roads = this.player.getRoads();
    let adjSettlements = settlements.filter(settlement => {
      return roads.some(road => road.split('-').includes(settlement));
    });
    adjSettlements = new Set(adjSettlements);
    return Array.from(adjSettlements);
  }

  addRoadWithResources(pathId) {
    this.board.addRoad(pathId);
    this.player.addRoad(pathId);
    const isDeducted = this.player.deductCardsForRoad(pathId);
    if (isDeducted) {
      this.bank.add({ lumber: 1, brick: 1 });
    }
  }
}

module.exports = { Game };
