const express = require('express');
const {Board} = require('./models/board');
const {Player} = require('./models/player');
const Cards = require('./models/cards');
const {
  getBankStatus,
  getTerrainDetails,
  getCardsCount,
  getAvailableSettlements,
  buildSettlement
} = require('./handlers');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.locals.board = new Board();
app.locals.player = new Player();
app.locals.cards = new Cards();

app.post('/buildSettlement', buildSettlement);

app.get('/', (req, res) => res.redirect('catan.html'));
app.get('/requestSettlement', getAvailableSettlements);
app.get('/bankStatus', getBankStatus);
app.get('/cardsCount', getCardsCount);
app.get('/terrains', getTerrainDetails);
module.exports = {app};
