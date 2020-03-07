const { Board } = require('./models/board');
const Bank = require('./models/bank');
const Cards = require('./models/cards');

const getTerrainDetails = function(req, res) {
  const board = new Board();
  res.json(board.getTerrains());
};

const getBankStatus = (req, res) => {
  const bank = new Bank();
  const bankStatus = bank.getBankStatus();
  res.json(bankStatus);
};

const getCardsCount = function(req, res) {
  const cards = new Cards();
  res.json(cards.count());
};

module.exports = {
  getTerrainDetails,
  getCardsCount,
  getBankStatus
};
