const express = require('express');
const catanRouter = express.Router();

const {
  getBuildStatus,
  getAvailableSettlements,
  getAvailableAdjSettlements,
  resourceProduction,
  buildInitialSettlement,
  buildSettlement,
  servePossiblePathsForRoad,
  servePossiblePathsForRoadInSetup,
  addRoad,
  addRoadWithResources,
  addResourcesToPlayer,
  serveWaitingPage,
  getJoinedPlayerDetails,
  ensureGame,
  ensureGameStart,
  serveGameStatus,
  getDiceRolledStatus,
  endTurn,
  serveLoadGame,
  servePossiblePositionsForCity,
  buildCity
} = require('./handlers');

catanRouter.use(ensureGame);
catanRouter.get('/waiting.html', serveWaitingPage);
catanRouter.get('/joinedPlayerDetails', getJoinedPlayerDetails);
catanRouter.get('/home.html', ensureGameStart, express.static('public'));
catanRouter.use(express.static('public'));
catanRouter.get('/buildStatus', getBuildStatus);
catanRouter.get('/requestInitialSettlement', getAvailableSettlements);
catanRouter.get('/requestSettlement', getAvailableAdjSettlements);
catanRouter.get('/diceRolledStatus', getDiceRolledStatus);
catanRouter.get('/resourceProduction', resourceProduction);
catanRouter.post('/buildSettlement', buildSettlement);
catanRouter.post('/buildInitialSettlement', buildInitialSettlement);
catanRouter.get('/getPossiblePathsForRoad', servePossiblePathsForRoad);
catanRouter.get(
  '/getPossiblePathsForRoadInSetup',
  servePossiblePathsForRoadInSetup
);
catanRouter.get('/possiblePositionsForCity', servePossiblePositionsForCity);
catanRouter.post('/buildRoad', addRoad);
catanRouter.post('/buildRoadWithResources', addRoadWithResources);
catanRouter.post('/addResourcesToPlayer', addResourcesToPlayer);
catanRouter.get('/gameStatus', serveGameStatus);
catanRouter.get('/endTurn', endTurn);
catanRouter.get('/loadGame', serveLoadGame);
catanRouter.post('/buildCity', buildCity);
module.exports = { catanRouter };
