const express = require('express');
const { Game } = require('./models/game');
const { GameList } = require('./models/gameList');

const {
  getBankStatus,
  getTerrainDetails,
  getCardsCount,
  getAvailableSettlements,
  buildSettlement,
  addResourcesToPlayer,
  getRandomDiceNum,
  servePossiblePathsForRoadInSetup,
  addRoad,
  resourceProduction,
  getBuildStatus,
  servePossiblePathsForRoad,
  buildInitialSettlement,
  getAvailableAdjSettlements,
  addRoadWithResources
} = require('./handlers');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.locals.game = new Game();
app.locals.gameList = new GameList();

app.get('/', (req, res) => res.redirect('catan.html'));
app.get('/buildStatus', getBuildStatus);
app.get('/requestInitialSettlement', getAvailableSettlements);
app.get('/requestSettlement', getAvailableAdjSettlements);
app.get('/bankStatus', getBankStatus);
app.get('/diceNumbers', getRandomDiceNum);
app.get('/cardsCount', getCardsCount);
app.get('/terrains', getTerrainDetails);
app.get('/getPossiblePathsForRoadInSetup', servePossiblePathsForRoadInSetup);
app.get('/getPossiblePathsForRoad', servePossiblePathsForRoad);
app.post('/resourceProduction', resourceProduction);
app.post('/buildSettlement', buildSettlement);
app.post('/buildInitialSettlement', buildInitialSettlement);
app.post('/addResourcesToPlayer', addResourcesToPlayer);
app.post('/buildRoad', addRoad);
app.post('/buildRoadWithResources', addRoadWithResources);

module.exports = { app };
