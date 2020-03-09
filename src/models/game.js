const { Player } = require('./player');
const { Board } = require('./board');
const { Bank } = require('./bank');

class Game {
  constructor() {
    this.board = new Board();
    this.bank = new Bank();
    this.player = new Player();
  }
  cardsCount() {
    return this.player.cardsCount();
  }
}

module.exports = { Game };
