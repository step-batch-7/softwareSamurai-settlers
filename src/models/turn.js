class Turn {
  constructor(playerIds) {
    this.playerIds = playerIds.slice();
    this.currentTurnIndex = 0;
    this.setup = playerIds.concat(
      playerIds
        .slice()
        .reverse()
        .slice(0, -1)
    );
  }

  next() {
    this.currentTurnIndex = (this.currentTurnIndex + 1) % 4;
    return this.currentPlayerId;
  }

  setupNext() {
    return this.setup.pop();
  }

  get currentPlayerId() {
    return this.playerIds[this.currentTurnIndex];
  }

  changeTurn(mode) {
    return mode === 'setup' ? this.setupNext() : this.next();
  }

  otherPlayers(playerId) {
    const playerIndex = this.playerIds.indexOf(playerId);
    const otherPlayers = this.playerIds.slice(playerIndex + 1);
    return otherPlayers.concat(this.playerIds.slice(0, playerIndex));
  }
}

module.exports = {Turn};
