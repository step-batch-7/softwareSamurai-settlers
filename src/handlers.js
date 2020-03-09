const productions = {
  fields: 'grain',
  forest: 'lumber',
  hills: 'brick',
  pasture: 'wool',
  mountains: 'ore'
};

const getTerrainDetails = function(req, res) {
  const boardData = {
    terrainsInfo: req.app.locals.board.getTerrains(),
    settlements: req.app.locals.player.getSettlements(),
    roads: req.app.locals.player.getRoads()
  };
  res.json(boardData);
};

const getBankStatus = (req, res) => {
  const {game} = req.app.locals;
  res.json(game.bankStatus());
};

const getCardsCount = function(req, res) {
  const { game } = req.app.locals;
  res.json(game.cardsCount());
};

const getAvailableSettlements = function(req, res) {
  const settlements = req.app.locals.board.getAvailableSettlements();
  res.json(settlements);
};

const randNum = () => Math.ceil(Math.random() * 6);

const getRandomDiceNum = function(req, res) {
  res.json({ dice1: randNum(), dice2: randNum() });
};

const buildSettlement = function(req, res) {
  const { intersection } = req.body;
  const { board, player, bank } = req.app.locals;
  board.buildSettlement(intersection);
  player.addSettlement(intersection);
  player.deductCardsForSettlement(intersection);
  bank.add({ grain: 1, lumber: 1, brick: 1, wool: 1 });
  res.end();
};

const buildInitialSettlement = function(req, res) {
  const { intersection } = req.body;
  const { board, player } = req.app.locals;
  board.buildSettlement(intersection);
  player.addSettlement(intersection);
  res.end();
};

const addResourcesToPlayer = function(req, res) {
  const { board, bank, player } = req.app.locals;
  const terrains = board.getTerrains();
  const settlement = player.settlements.slice().pop();
  const tokenIds = settlement.split('');
  const resourceCards = tokenIds.reduce((resourceCards, tokenId) => {
    if (terrains[tokenId]) {
      const terrain = terrains[tokenId].resource;
      resourceCards.push({ resource: productions[terrain], count: 1 });
    }
    return resourceCards;
  }, []);
  resourceCards.forEach(resourceCard => {
    bank.remove(resourceCard);
    player.addResources(resourceCard);
  });
  res.end();
};

const addRoad = function(req, res) {
  const { board, player } = req.app.locals;
  const { pathId } = req.body;
  board.addRoad(pathId);
  player.addRoad(pathId);
  res.end();
};

const servePossiblePathsForRoadInSetup = (req, res) => {
  const { player, board } = req.app.locals;
  const settlement = player.settlements.slice().pop();
  const possiblePositionsForRoad = board.getEmptyPaths();
  const possiblePositionsToBuildRoad = possiblePositionsForRoad.filter(
    position => {
      return position
        .split('-')
        .some(intersection => settlement === intersection);
    }
  );
  res.json(possiblePositionsToBuildRoad);
};

const servePossiblePathsForRoad = (req, res) => {
  const { player, board } = req.app.locals;
  const roads = player.getRoads();
  const intersections = roads.reduce((intersections, road) => {
    return intersections.concat(road.split('-'));
  }, []);

  const remainingPaths = board.getEmptyPaths();
  const possiblePaths = intersections.reduce((possiblePaths, intersection) => {
    const positionsToBuildRoad = remainingPaths.filter(position => {
      return position.split('-').includes(intersection);
    });
    return possiblePaths.concat(positionsToBuildRoad);
  }, []);
  res.json(possiblePaths);
};

const getResources = function(req, res) {
  const { numToken } = req.body;
  const { game } = req.app.locals;
  game.resourceProduction(numToken);
  res.json(game.cardsCount());
};

const getBuildStatus = function(req, res) {
  const { player } = req.app.locals;
  const canBuildSettlement = player.canBuildSettlement();
  res.json({ settlement: canBuildSettlement });
};

const getAvailableAdjSettlements = function(req, res) {
  const { board, player } = req.app.locals;
  const settlements = board.getAvailableSettlements();
  const roads = player.getRoads();
  const adjSettlements = settlements.filter(settlement => {
    return roads.some(road => road.split('-').includes(settlement));
  });
  res.json(adjSettlements);
};

module.exports = {
  getTerrainDetails,
  getCardsCount,
  getBankStatus,
  getAvailableSettlements,
  buildSettlement,
  addResourcesToPlayer,
  getRandomDiceNum,
  servePossiblePathsForRoadInSetup,
  addRoad,
  getResources,
  getBuildStatus,
  servePossiblePathsForRoad,
  buildInitialSettlement,
  getAvailableAdjSettlements
};
