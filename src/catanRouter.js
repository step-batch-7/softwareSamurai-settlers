const express = require('express');
const catanRouter = express.Router();

const {
  getBuildStatus,
  getAvailableSettlements,
  getAvailableAdjSettlements,
  getBankStatus,
  getTerrainDetails,
  getCardsCount,
  resourceProduction,
  buildInitialSettlement,
  buildSettlement,
  servePossiblePathsForRoad,
  servePossiblePathsForRoadInSetup,
  addRoad,
  addRoadWithResources,
  getRandomDiceNum,
  addResourcesToPlayer
} = require('./handlers');

catanRouter.get('/buildStatus', getBuildStatus);
catanRouter.get('/terrains', getTerrainDetails);
catanRouter.get('/requestInitialSettlement', getAvailableSettlements);
catanRouter.get('/requestSettlement', getAvailableAdjSettlements);
catanRouter.get('/cardsCount', getCardsCount);
catanRouter.post('/resourceProduction', resourceProduction);
catanRouter.get('/bankStatus', getBankStatus);
catanRouter.post('/buildSettlement', buildSettlement);
catanRouter.post('/buildInitialSettlement', buildInitialSettlement);
catanRouter.get('/getPossiblePathsForRoad', servePossiblePathsForRoad);
catanRouter.get(
  '/getPossiblePathsForRoadInSetup',
  servePossiblePathsForRoadInSetup
);
catanRouter.post('/buildRoad', addRoad);
catanRouter.post('/buildRoadWithResources', addRoadWithResources);
catanRouter.get('/diceNumbers', getRandomDiceNum);
catanRouter.post('/addResourcesToPlayer', addResourcesToPlayer);

module.exports = { catanRouter };
