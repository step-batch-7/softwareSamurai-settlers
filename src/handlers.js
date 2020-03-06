const { Board } = require('./models/board');
const Bank = require('./models/bank');

const getTerrainDetails = function(req, res) {
  const board = new Board();
  res.json(board.getTerrains());
};

const getBankStatus = (req, res) => {
  const bank = new Bank();
  const bankStatus = bank.getBankStatus();
  res.end(JSON.stringify(bankStatus));
};

module.exports = { getBankStatus, getTerrainDetails };
