const generateSessionId = function() {
  return new Date().getTime() + Math.floor(Math.random() * 1000);
};

class Sessions {
  constructor() {
    this.sessions = {};
  }

  createSession(gameId, playerId) {
    const id = generateSessionId();
    this.sessions[id] = { gameId, playerId };
    return id;
  }

  getSession(id) {
    return this.sessions[id];
  }
}

module.exports = { Sessions };
