const getTerrainDetails = function(req, res) {
  const {game, playerId} = req.app.locals;
  const boardData = game.getBoardData(playerId);
  res.json(boardData);
};

const getBankStatus = (req, res) => {
  const {game} = req.app.locals;
  res.json(game.bankStatus());
};

const getCardsCount = function(req, res) {
  const {game, playerId} = req.app.locals;
  res.json(game.cardsCount(playerId));
};

const getAvailableSettlements = function(req, res) {
  const {game} = req.app.locals;
  const settlements = game.getAvailableSettlements();
  res.json(settlements);
};

const randNum = () => Math.ceil(Math.random() * 6);

const getRandomDiceNum = function(req, res) {
  const {game} = req.app.locals;
  game.toggleDiceRolledStatus();
  res.json({dice1: randNum(), dice2: randNum()});
};

const buildSettlement = function(req, res) {
  const {intersection} = req.body;
  const {game, playerId} = req.app.locals;
  game.buildSettlement(intersection, playerId);
  res.end();
};

const buildInitialSettlement = function(req, res) {
  const {intersection} = req.body;
  const {game, playerId} = req.app.locals;
  game.buildInitialSettlement(intersection, playerId);
  res.end();
};

const addResourcesToPlayer = function(req, res) {
  const {game, playerId} = req.app.locals;
  game.addResourcesToPlayer(playerId);
  res.end();
};

const addRoad = function(req, res) {
  const {game, playerId} = req.app.locals;
  const {pathId} = req.body;
  game.addRoad(playerId, pathId);
  res.end();
};

const servePossiblePathsForRoadInSetup = (req, res) => {
  const {game, playerId} = req.app.locals;
  const possiblePositionsToBuildRoad = game.possiblePathsForSetup(playerId);
  res.json(possiblePositionsToBuildRoad);
};

const servePossiblePathsForRoad = (req, res) => {
  const {game, playerId} = req.app.locals;
  const possiblePaths = game.possiblePaths(playerId);
  res.json(possiblePaths);
};

const resourceProduction = function(req, res) {
  const {numToken} = req.body;
  const {game} = req.app.locals;
  game.resourceProduction(numToken);
  res.end();
};

const getBuildStatus = function(req, res) {
  const {game, playerId} = req.app.locals;
  const buildStatus = game.canBuild(playerId);
  res.json(buildStatus);
};

const getAvailableAdjSettlements = function(req, res) {
  const {game, playerId} = req.app.locals;
  const adjSettlements = game.getAvailableAdjSettlements(playerId);
  res.json(adjSettlements);
};

const addRoadWithResources = function(req, res) {
  const {pathId} = req.body;
  const {game, playerId} = req.app.locals;
  game.addRoadWithResources(playerId, pathId);
  res.end();
};

const serveWaitingPage = function(req, res) {
  const {sId} = req.cookies;
  const {sessions} = req.app.locals;
  const {gameId} = sessions.getSession(sId);
  if (gameId) {
    res.render('waiting', {gameId: gameId});
  }
};

const serveJoinPage = function(req, res) {
  res.render('join');
};

const joinGame = function(req, res) {
  const {playerName, gameId} = req.body;
  const {sessions, gameList} = req.app.locals;
  const isGameAvailable = gameList.isGameAvailable(gameId);

  if (!isGameAvailable) {
    return res.render('join', {error: 'Game id is not valid'});
  }

  const game = gameList.getGame(gameId);
  const playerId = game.addPlayer(playerName);
  const sessionId = sessions.createSession(gameId, playerId);
  res.cookie('sId', sessionId);
  res.redirect('/catan/waiting.html');
};

const ensureGame = function(req, res, next) {
  const {sId} = req.cookies;
  const {sessions, gameList} = req.app.locals;
  const session = sessions.getSession(sId);
  if (!session) {
    return res.redirect('/index.html');
  }
  const game = gameList.getGame(session.gameId);
  req.app.locals.game = game;
  req.app.locals.playerId = session.playerId;
  next();
};

const ensureGameStart = function(req, res, next) {
  const {sId} = req.cookies;
  const {sessions, gameList} = req.app.locals;
  const session = sessions.getSession(sId);
  const game = gameList.getGame(session.gameId);
  if (!game.hasStarted()) {
    res.redirect('/catan/waiting.html');
    return;
  }
  next();
};

const hostNewGame = function(req, res) {
  const {hostName} = req.body;
  const {sessions, gameList} = req.app.locals;
  const gameId = gameList.createGame();
  const game = gameList.getGame(gameId);
  const playerId = game.addPlayer(hostName);
  const sessionId = sessions.createSession(gameId, playerId);
  res.cookie('sId', sessionId);
  res.redirect('/catan/waiting.html');
};

const getJoinedPlayerDetails = function(req, res) {
  const {sId} = req.cookies;
  const {sessions, game} = req.app.locals;
  const session = sessions.getSession(sId);
  if (session) {
    const playerDetails = game.getPlayerDetails();
    const isGameStarted = game.hasStarted(session.gameId);
    res.json({playerDetails, isGameStarted});
  }
};

const ensureSession = function(req, res, next) {
  const {sId} = req.cookies;
  const {sessions, gameList} = req.app.locals;
  const session = sessions.getSession(sId);
  if (session) {
    const game = gameList.getGame(session.gameId);
    req.app.locals.game = game;
    res.redirect('/catan/waiting.html');
    return;
  }
  next();
};

const serveGameStatus = function(req, res) {
  const {game, playerId} = req.app.locals;
  res.json(game.status(playerId));
};

const getDiceRolledStatus = (req, res) => {
  const {game} = req.app.locals;
  const diceRolledStatus = game.getDiceRolledStatus();
  res.json({diceRolledStatus});
};

const endTurn = (req, res) => {
  const { game, playerId } = req.app.locals;
  game.toggleDiceRolledStatus();
  game.passTurn(playerId);
  res.end();
};

const serveLoadGame = function(req, res) {
  const {game, playerId} = req.app.locals;
  res.json(game.status(playerId));
};

module.exports = {
  getTerrainDetails,
  getCardsCount,
  getBankStatus,
  getAvailableSettlements,
  buildSettlement,
  addResourcesToPlayer,
  getRandomDiceNum,
  servePossiblePathsForRoadInSetup,
  addRoad,
  resourceProduction,
  getBuildStatus,
  servePossiblePathsForRoad,
  buildInitialSettlement,
  getAvailableAdjSettlements,
  addRoadWithResources,
  hostNewGame,
  serveWaitingPage,
  serveJoinPage,
  joinGame,
  getJoinedPlayerDetails,
  ensureGame,
  ensureGameStart,
  ensureSession,
  serveGameStatus,
  getDiceRolledStatus,
  endTurn,
  serveLoadGame
};
