const getGameDetails = function(req) {
  const { gameList, sessions } = req.app.locals;
  const session = sessions.getSession(req.cookies.sId);
  const game = gameList.getGame(session.gameId);
  return { game, playerId: session.playerId };
};

const getAvailableSettlements = function(req, res) {
  const { game } = req.app.locals;
  const settlements = game.getAvailableSettlements();
  res.json(settlements);
};

const buildSettlement = function(req, res) {
  const { intersection } = req.body;
  const { game, playerId } = getGameDetails(req);
  game.buildSettlement(intersection, playerId);
  res.end();
};

const buildInitialSettlement = function(req, res) {
  const { intersection } = req.body;
  const { game, playerId } = getGameDetails(req);
  game.buildInitialSettlement(intersection, playerId);
  res.end();
};

const addResourcesToPlayer = function(req, res) {
  const { game, playerId } = getGameDetails(req);
  game.addResourcesToPlayer(playerId);
  res.end();
};

const addRoad = function(req, res) {
  const { game, playerId } = getGameDetails(req);
  const { pathId } = req.body;
  game.addRoad(playerId, pathId);
  game.passTurn(playerId);
  res.json(game.status(playerId).stage);
};

const servePossiblePathsForRoadInSetup = (req, res) => {
  const { game, playerId } = getGameDetails(req);
  const possiblePositionsToBuildRoad = game.possiblePathsForSetup(playerId);
  res.json({
    pathIds: possiblePositionsToBuildRoad,
    color: game.status(playerId).player.color
  });
};

const servePossiblePathsForRoad = (req, res) => {
  const { game, playerId } = getGameDetails(req);
  const possiblePaths = game.possiblePaths(playerId);
  res.json({
    pathIds: possiblePaths,
    color: game.status(playerId).player.color
  });
};

const randNum = () => Math.ceil(Math.random() * 6);

const resourceProduction = function(req, res) {
  const { game } = getGameDetails(req);
  game.toggleDiceRolledStatus();
  const dice1 = randNum();
  const dice2 = randNum();
  game.updateDice(dice1, dice2);
  game.resourceProduction();
  res.json({ dice1, dice2 });
};

const getBuildStatus = function(req, res) {
  const { game, playerId } = getGameDetails(req);
  const buildStatus = game.canBuild(playerId);
  res.json(buildStatus);
};

const getAvailableAdjSettlements = function(req, res) {
  const { game, playerId } = getGameDetails(req);
  const adjSettlements = game.getAvailableAdjSettlements(playerId);
  res.json(adjSettlements);
};

const addRoadWithResources = function(req, res) {
  const { pathId } = req.body;
  const { game, playerId } = getGameDetails(req);
  game.addRoadWithResources(playerId, pathId);
  res.end();
};

const serveWaitingPage = function(req, res) {
  const { sId } = req.cookies;
  const { sessions } = req.app.locals;
  const { gameId } = sessions.getSession(sId);
  if (gameId) {
    res.render('waiting', { gameId: gameId });
  }
};

const serveJoinPage = function(req, res) {
  res.render('join');
};

const joinGame = function(req, res) {
  const { playerName, gameId } = req.body;
  const { sessions, gameList } = req.app.locals;
  const isGameAvailable = gameList.isGameAvailable(gameId);

  if (!isGameAvailable) {
    return res.render('join', { error: 'Game id is not valid' });
  }

  const game = gameList.getGame(gameId);
  const playerId = game.addPlayer(playerName);
  const sessionId = sessions.createSession(gameId, playerId);
  res.cookie('sId', sessionId);
  res.redirect('/catan/waiting.html');
};

const ensureGame = function(req, res, next) {
  const { sId } = req.cookies;
  const { sessions, gameList } = req.app.locals;
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
  const { sId } = req.cookies;
  const { sessions, gameList } = req.app.locals;
  const session = sessions.getSession(sId);
  const game = gameList.getGame(session.gameId);
  if (!game.hasStarted()) {
    res.redirect('/catan/waiting.html');
    return;
  }
  next();
};

const hostNewGame = function(req, res) {
  const { hostName } = req.body;
  const { sessions, gameList } = req.app.locals;
  const gameId = gameList.createGame();
  const game = gameList.getGame(gameId);
  const playerId = game.addPlayer(hostName);
  const sessionId = sessions.createSession(gameId, playerId);
  res.cookie('sId', sessionId);
  res.redirect('/catan/waiting.html');
};

const getJoinedPlayerDetails = function(req, res) {
  const { sId } = req.cookies;
  const { sessions } = req.app.locals;
  const { game } = getGameDetails(req);
  const session = sessions.getSession(sId);
  if (session) {
    const playerDetails = game.getPlayerDetails();
    const isGameStarted = game.hasStarted(session.gameId);
    res.json({ playerDetails, isGameStarted });
  }
};

const ensureSession = function(req, res, next) {
  const { sId } = req.cookies;
  const { sessions, gameList } = req.app.locals;
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
  const { game, playerId } = getGameDetails(req);
  res.json(game.status(playerId));
};

const getDiceRolledStatus = (req, res) => {
  const { game, playerId } = getGameDetails(req);
  const diceRolledStatus = game.getDiceRolledStatus();
  const turn = game.players[playerId].turn;
  const { mode } = game.status(playerId).stage;
  res.json({ diceRolledStatus, turn, mode });
};

const endTurn = (req, res) => {
  const { game, playerId } = getGameDetails(req);
  game.toggleDiceRolledStatus();
  game.passTurn(playerId);
  res.end();
};

const serveLoadGame = function(req, res) {
  const { game, playerId } = getGameDetails(req);
  res.json({ status: game.status(playerId), boardData: game.boardData });
};

const servePossiblePositionsForCity = function(req, res) {
  const { game, playerId } = getGameDetails(req);
  res.json(game.possibleCities(playerId));
};

module.exports = {
  getAvailableSettlements,
  buildSettlement,
  addResourcesToPlayer,
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
  serveLoadGame,
  servePossiblePositionsForCity
};
