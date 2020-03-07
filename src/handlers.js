const getTerrainDetails = function(req, res) {
  const boardData = {
    terrainsInfo: req.app.locals.board.getTerrains(),
    settlements: req.app.locals.player.getSettlements()
  };
  res.json(boardData);
};

const getBankStatus = (req, res) => {
  const {bank} = req.app.locals;
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

const randNum = () => Math.ceil(Math.random() * 6);

const getRandomDiceNum = function(req, res) {
  res.json({dice1: randNum(), dice2: randNum()});
};

const buildSettlement = function(req, res) {
  const {intersection} = req.body;
  req.app.locals.board.buildSettlement(intersection);
  req.app.locals.player.addSettlement(intersection);
  res.end();
};

const addResourcesToPlayer = function(req, res) {
  const productions = {
    fields: 'grain',
    forest: 'lumber',
    hills: 'brick',
    pasture: 'wool',
    mountains: 'ore'
  };
  const {board, bank, player} = req.app.locals;
  const terrains = board.getTerrains();
  const settlement = player.settlements.slice().pop();
  const tokenIds = settlement.split('');
  const resourceCards = tokenIds.reduce((resourceCards, tokenId) => {
    if (terrains[tokenId]) {
      const terrain = terrains[tokenId].resource;
      resourceCards.push({resource: productions[terrain], count: 1});
    }
    return resourceCards;
  }, []);
  resourceCards.forEach(resourceCard => {
    bank.remove(resourceCard);
    player.addResources(resourceCard);
  });
  res.end();
};

module.exports = {
  getTerrainDetails,
  getCardsCount,
  getBankStatus,
  getAvailableSettlements,
  buildSettlement,
  addResourcesToPlayer,
  getRandomDiceNum
};
