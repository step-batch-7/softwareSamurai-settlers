class Turn {
  constructor(playerIds) {
    this.playerIds = playerIds.slice();
    this.currentTurnIndex = 0;
  }

  next() {
    this.currentTurnIndex = (this.currentTurnIndex + 1) % 4;
    return this.currentPlayerId;
  }

  get currentPlayerId() {
    return this.playerIds[this.currentTurnIndex];
  }

}

module.exports = { Turn };
