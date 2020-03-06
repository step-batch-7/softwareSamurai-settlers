const express = require('express');

const { getTerrainDetails } = require('./handlers');

const app = express();
const {serveCardsCount} = require('../lib/handlers');

app.use(express.static('public'));
app.get('/', (req, res) => res.redirect('catan.html'));
app.get('/cardsCount', serveCardsCount);
app.get('/terrains', getTerrainDetails);
module.exports = { app };
