const express = require('express');
const {getBankStatus, getTerrainDetails, getCardsCount} = require('./handlers');

const app = express();

app.use(express.static('public'));
app.get('/', (req, res) => res.redirect('catan.html'));
app.get('/bankStatus', getBankStatus);
app.get('/cardsCount', getCardsCount);
app.get('/terrains', getTerrainDetails);
module.exports = {app};
