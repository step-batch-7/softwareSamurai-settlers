class Player {
  constructor() {
    this.settlements = [];
  }

  addSettlement(settlement) {
    this.settlements.push(settlement);
  }
}

module.exports = {
  Player
};
