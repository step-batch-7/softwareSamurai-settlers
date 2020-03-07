class Player {
  constructor() {
    this.settlements = [];
  }

  addSettlement(settlement) {
    this.settlements.push(settlement);
  }

  getSettlements() {
    return this.settlements;
  }
}

module.exports = {
  Player
};
