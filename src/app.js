const express = require('express');
const app = express();
const {serveCardsCount} = require('../lib/handlers');

app.use(express.static('public'));
app.get('/', (req, res) => res.redirect('catan.html'));
app.get('/cardsCount', serveCardsCount);
module.exports = {app};
