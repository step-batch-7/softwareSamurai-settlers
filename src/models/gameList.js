const { Game } = require('./game');

class GameList {
  constructor() {
    this.games = {};
  }

  generateGameId() {
    this.lastId = ++this.lastId || 1000;
    return this.lastId;
  }

  initializeGame() {
    const id = this.generateGameId();
    this.games[id] = new Game();
  }

  getGame(gameId) {
    return this.games[gameId];
  }
}

module.exports = { GameList };
