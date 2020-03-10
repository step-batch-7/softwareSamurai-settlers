const { Game } = require('./game');

class GameList {
  constructor() {
    this.games = {};
  }

  generateGameId() {
    let [lastId] = Object.keys(this.games)
      .sort()
      .reverse();
    return ++lastId || 1000;
  }

  createGame(hostName) {
    const id = this.generateGameId();
    const game = Game.initializeGame(hostName);
    this.games[id] = game;
    return id;
  }

  getGame(gameId) {
    return this.games[gameId];
  }
}

module.exports = { GameList };
