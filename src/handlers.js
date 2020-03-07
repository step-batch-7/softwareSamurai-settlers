const getTerrainDetails = function(req, res) {
  const boardData = {
    terrainsInfo: req.app.locals.board.getTerrains(),
    settlements: req.app.locals.player.getSettlements()
  };
  res.json(boardData);
};

const getBankStatus = (req, res) => {
  const { bank } = req.app.locals;
  const bankStatus = bank.status;
  res.json(bankStatus);
};

const getCardsCount = function(req, res) {
  res.json(req.app.locals.player.cardsCount());
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

const addResourcesToPlayer = function(req, res) {
  const productions = {
    fields: 'grain',
    forest: 'wood',
    hills: 'brick',
    pasture: 'wool',
    mountains: 'ore'
  };
  const { board, bank, cards, player } = req.app.locals;
  const terrains = board.getTerrains();
  const settlement = player.settlements.slice().pop();
  const tokenIds = settlement.split('');
  const resourceCards = tokenIds.map(tokenId => {
    const terrain = terrains[tokenId].resource;
    return { resource: productions[terrain], count: 1 };
  });
  bank.remove(resourceCards);
  cards.addResources(resourceCards);
  res.end();
};

module.exports = {
  getTerrainDetails,
  getCardsCount,
  getBankStatus,
  getAvailableSettlements,
  buildSettlement,
  addResourcesToPlayer
};
