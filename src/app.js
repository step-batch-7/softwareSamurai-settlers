const express = require('express');
const app = express();
const {serveCardsCount} = require('../lib/handlers');

app.use(express.static('public'));
app.get('/cardsCount', serveCardsCount);

module.exports = {app};
