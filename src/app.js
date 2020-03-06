const express = require('express');

const { getTerrainDetails } = require('./handlers');

const app = express();
app.use(express.static('public'));
app.get('/', (req, res) => res.redirect('catan.html'));
app.get('/terrains', getTerrainDetails);
module.exports = { app };
