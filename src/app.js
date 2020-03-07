const express = require('express');
const {Board} = require('./models/board');
const {Player} = require('./models/player');
const Cards = require('./models/cards');
const Bank = require('./models/bank');

const {
  getBankStatus,
  getTerrainDetails,
  getCardsCount,
  getAvailableSettlements,
  buildSettlement,
  addResourcesToPlayer,
  getRandomDiceNum
} = require('./handlers');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.locals.board = new Board();
app.locals.player = new Player();
app.locals.cards = new Cards();
app.locals.bank = new Bank();

app.get('/', (req, res) => res.redirect('catan.html'));
app.get('/requestSettlement', getAvailableSettlements);
app.get('/bankStatus', getBankStatus);
app.get('/diceNumbers', getRandomDiceNum);
app.get('/cardsCount', getCardsCount);
app.get('/terrains', getTerrainDetails);
app.post('/buildSettlement', buildSettlement);
app.post('/addResourcesToPlayer', addResourcesToPlayer);

module.exports = {app};
