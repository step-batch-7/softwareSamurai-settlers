const { Board } = require('./models/board');

const getTerrainDetails = function(req, res) {
  const board = new Board();
  res.json(board.getTerrains());
};

module.exports = {
  getTerrainDetails
};
