const express = require('express');
const { getBankStatus, getTerrainDetails } = require('./handlers');
const { serveCardsCount } = require('../lib/handlers');

const app = express();
app.get('/bankStatus', getBankStatus);
app.get('/', (req, res) => res.redirect('catan.html'));
app.get('/cardsCount', serveCardsCount);
app.get('/terrains', getTerrainDetails);
app.use(express.static('public'));
module.exports = { app };
