const Bank = require('./models/bank');
const Cards = require('./models/cards');

const getTerrainDetails = function(req, res) {
  res.json(req.app.locals.board.getTerrains());
};

const getBankStatus = (req, res) => {
  const bank = new Bank();
  const bankStatus = bank.status;
  res.json(bankStatus);
};

const getCardsCount = function(req, res) {
  const cards = new Cards();
  res.json(cards.count());
};

const getAvailableSettlements = function(req, res) {
  const settlements = req.app.locals.board.getAvailableSettlements();
  res.json(settlements);
};

const buildSettlement = function(req, res) {
  const { intersection } = req.body;
  req.app.locals.board.buildSettlement(intersection);
  req.app.locals.player.addSettlement(intersection);
  res.end();
};

module.exports = {
  getTerrainDetails,
  getCardsCount,
  getBankStatus,
  getAvailableSettlements,
  buildSettlement
};
