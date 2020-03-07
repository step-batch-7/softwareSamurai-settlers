const express = require('express');
const { Board } = require('./models/board');
const {
  getBankStatus,
  getTerrainDetails,
  getCardsCount,
  getAvailableSettlements
} = require('./handlers');

const app = express();

app.use(express.static('public'));
app.locals.board = new Board();
app.get('/', (req, res) => res.redirect('catan.html'));
app.get('/requestSettlement', getAvailableSettlements);
app.get('/bankStatus', getBankStatus);
app.get('/cardsCount', getCardsCount);
app.get('/terrains', getTerrainDetails);
module.exports = { app };
