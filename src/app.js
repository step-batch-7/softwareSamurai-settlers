const express = require('express');
const { Board } = require('./models/board');
const { Player } = require('./models/player');
const { Bank } = require('./models/bank');
const { Game } = require('./models/game');

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
  getResources,
  getBuildStatus,
  servePossiblePathsForRoad,
  buildInitialSettlement,
  getAvailableAdjSettlements,
  addRoadWithResources
} = require('./handlers');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.locals.board = new Board();
app.locals.player = new Player();
app.locals.bank = new Bank();
app.locals.game = new Game();

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
app.post('/getResources', getResources);
app.post('/buildSettlement', buildSettlement);
app.post('/buildInitialSettlement', buildInitialSettlement);
app.post('/addResourcesToPlayer', addResourcesToPlayer);
app.post('/buildRoad', addRoad);
app.post('/buildRoadWithResources', addRoadWithResources);

module.exports = { app };
