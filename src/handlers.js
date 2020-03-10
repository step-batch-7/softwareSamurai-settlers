const getTerrainDetails = function(req, res) {
  const { game } = req.app.locals;
  const boardData = game.getBoardData();
  res.json(boardData);
};

const getBankStatus = (req, res) => {
  const { game } = req.app.locals;
  res.json(game.bankStatus());
};

const getCardsCount = function(req, res) {
  const { game } = req.app.locals;
  res.json(game.cardsCount());
};

const getAvailableSettlements = function(req, res) {
  const { game } = req.app.locals;
  const settlements = game.getAvailableSettlements();
  res.json(settlements);
};

const randNum = () => Math.ceil(Math.random() * 6);

const getRandomDiceNum = function(req, res) {
  res.json({ dice1: randNum(), dice2: randNum() });
};

const buildSettlement = function(req, res) {
  const { intersection } = req.body;
  const { game } = req.app.locals;
  game.buildSettlement(intersection);
  res.end();
};

const buildInitialSettlement = function(req, res) {
  const { intersection } = req.body;
  const { game } = req.app.locals;
  game.buildInitialSettlement(intersection);
  res.end();
};

const addResourcesToPlayer = function(req, res) {
  const { game } = req.app.locals;
  game.addResourcesToPlayer();
  res.end();
};

const addRoad = function(req, res) {
  const { game } = req.app.locals;
  const { pathId } = req.body;
  game.addRoad(pathId);
  res.end();
};

const servePossiblePathsForRoadInSetup = (req, res) => {
  const { game } = req.app.locals;
  const possiblePositionsToBuildRoad = game.possiblePathsForSetup();
  res.json(possiblePositionsToBuildRoad);
};

const servePossiblePathsForRoad = (req, res) => {
  const { game } = req.app.locals;
  const possiblePaths = game.possiblePaths();
  res.json(possiblePaths);
};

const getResources = function(req, res) {
  const { numToken } = req.body;
  const { game } = req.app.locals;
  game.resourceProduction(numToken);
  res.end();
};

const getBuildStatus = function(req, res) {
  const { game } = req.app.locals;
  const buildStatus = game.canBuild();
  res.json(buildStatus);
};

const getAvailableAdjSettlements = function(req, res) {
  const { game } = req.app.locals;
  const adjSettlements = game.getAvailableAdjSettlements();
  res.json(adjSettlements);
};

const addRoadWithResources = function(req, res) {
  const { pathId } = req.body;
  const { game } = req.app.locals;
  game.addRoadWithResources(pathId);
  res.end();
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
  getAvailableAdjSettlements,
  addRoadWithResources
};
