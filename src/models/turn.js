class Turn {
  constructor(playerIds) {
    this.playerIds = playerIds.slice();
    this.currentTurnIndex = 0;
  }

  next() {
    this.currentTurnIndex = (this.currentTurnIndex + 1) % 4;
    return this.currentPlayerId;
  }

  previous() {
    this.currentTurnIndex = (this.currentTurnIndex - 1) % 4;
    return this.currentPlayerId;
  }

  get currentPlayerId() {
    return this.playerIds[this.currentTurnIndex];
  }

  otherPlayers(playerId) {
    const playerIndex = this.playerIds.indexOf(playerId);
    const otherPlayers = this.playerIds.slice(playerIndex + 1);
    return otherPlayers.concat(this.playerIds.slice(0, playerIndex));
  }
}

module.exports = { Turn };
