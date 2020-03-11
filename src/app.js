const express = require('express');
const { Game } = require('./models/game');
const { GameList } = require('./models/gameList');
const { Sessions } = require('./models/sessions');
const { catanRouter } = require('./catanRouter');

const { hostNewGame } = require('./handlers');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/catan', catanRouter);
app.locals.game = new Game();
app.locals.gameList = new GameList();
app.locals.sessions = new Sessions();

app.get('/', (req, res) => res.redirect('catan.html'));
app.post('/host', hostNewGame);

module.exports = { app };
