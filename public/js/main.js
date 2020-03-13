const hideAllPaths = () => {
  const paths = Array.from(document.querySelectorAll('.path'));
  paths.forEach(path => path.classList.add('hide'));
};

const disableMyTurn = (rollDice, endTurn) => {
  document.getElementById('rollDice').disabled = rollDice;
  document.getElementById('end-turn').disabled = endTurn;
};

const enablePlayerTurn = diceRolledStatus => {
  disableMyTurn(false, true);
  if (diceRolledStatus) {
    disableMyTurn(true, false);
    getBuildStatus();
  }
};

const requestDiceRolledStatus = async () => {
  const response = await fetch('/catan/diceRolledStatus');
  if (response.ok) {
    const { diceRolledStatus, turn, mode } = await response.json();
    if (turn && mode === 'normal') {
      enablePlayerTurn(diceRolledStatus);
      return;
    }
    disableMyTurn(true, true);
  }
};

const renderRoads = function(roads, color) {
  roads.forEach(road => {
    const path = document.getElementById(road);
    if (path.querySelector('image')) {
      return;
    }
    path.style.opacity = '1';
    path.classList.add('afterRoad');
    const img = `<image href='/catan/assets/roads/${color}-road.svg' 
    class="road-image">`;
    path.innerHTML = img;
  });
};

const renderPlayersRoads = function(player, otherPlayers) {
  const players = [player, ...otherPlayers];
  players.forEach(player => renderRoads(player.roads, player.color));
};

const renderSettlements = function(settlements, color) {
  settlements.forEach(settlement => {
    const intersection = document.getElementById(settlement);
    if (intersection.querySelector('image')) {
      return;
    }
    intersection.classList.add('afterSettlement');
    const imgUrl = `/catan/assets/settlements/${color}-settlement.svg`;
    const img = `<image href='${imgUrl}' style="height:100%; width:100%;">`;
    intersection.innerHTML = img;
  });
};

const renderPlayersSettlements = function(player, otherPlayers) {
  const players = [player, ...otherPlayers];
  players.forEach(player =>
    renderSettlements(player.settlements, player.color)
  );
};

const getRemainingCount = function(asset, maxCount) {
  return maxCount - asset.length;
};

const renderPlayerInfo1 = function(playerElement, player) {
  const {
    name,
    resourceCount,
    devCardCount,
    settlements,
    roads,
    cities,
    army,
    victoryPoints,
    longestRoad
  } = player;

  playerElement.querySelector('#playerName').innerText = name;
  playerElement.querySelector('#resource-cards').innerHTML = resourceCount;
  playerElement.querySelector('#development-cards').innerHTML = devCardCount;
  playerElement.querySelector('#victory-point').innerText = victoryPoints;
  playerElement.querySelector('#army').innerText = army;
  playerElement.querySelector('#longest-road').innerText = longestRoad;
  playerElement.querySelector(
    '#remaining-settlements'
  ).innerText = getRemainingCount(settlements, 5);
  playerElement.querySelector('#remaining-roads').innerText = getRemainingCount(
    roads,
    15
  );
  playerElement.querySelector(
    '#remaining-cities'
  ).innerText = getRemainingCount([], 4);
};

const renderPlayersInfo = function(otherPlayers, player) {
  if (!player.turn) {
    document.getElementById('rollDice').disabled = true;
  }
  const players = [player, ...otherPlayers];
  players.forEach((player, index) => {
    const playerElement = document.querySelector(`#player-info${index}`);
    renderPlayerInfo1(playerElement, player);
  });
};

const renderBankCards = function(bankCards) {
  updateCards('bank', bankCards);
};

const renderPlayerCards = function(player) {
  const { resources, devCardCount } = player;
  updateCards('player-cards', resources, devCardCount);
};

const highlightPlayer = (otherPlayers, player) => {
  const players = [player, ...otherPlayers];
  players.forEach((player, index) => {
    if (player.turn) {
      const playerElement = document.querySelector(`#player-info${index}`);
      playerElement.style.border = 'none';
      playerElement.classList.add('highlight');
    }
  });
};

const updateGameStatus = async function() {
  const response = await fetch('/catan/gameStatus');
  if (response.ok) {
    const { bankCards, player, otherPlayers, stage } = await response.json();
    renderBankCards(bankCards);
    renderPlayerCards(player);
    renderPlayersInfo(otherPlayers, player);
    renderPlayersSettlements(player, otherPlayers);
    renderPlayersRoads(player, otherPlayers);
    highlightPlayer(otherPlayers, player);
  }
};

const render = function(game) {
  const { bankCards, player, otherPlayers } = game;
  renderBankCards(bankCards);
  renderPlayerCards(player);
  renderPlayersInfoImgs(otherPlayers, player);
};

const setupMode = function(player, stage) {
  if (player.turn && stage.mode === 'setup') {
    if (stage.build === 'settlement') {
      showPossiblePathsForRoadInSetUp();
      return;
    }
    requestInitialSettlement();
  }
};

const updateGame = function() {
  updateGameStatus();
  requestDiceRolledStatus();
};

const loadGame = async function() {
  const response = await fetch('/catan/loadGame');
  if (response.ok) {
    const game = await response.json();
    renderPlayersInfoImgs(game.otherPlayers, game.player);
    setSrcForAction(game.player.color);
    const updateGame = setInterval(async () => {
      updateGameStatus();
      const res = await fetch('/catan/loadGame');
      const game = await res.json();
      if (game.player.turn) {
        clearInterval(updateGame);
        setupMode(game.player, game.stage);
        requestDiceRolledStatus();
      }
    }, 500);
  }
};

const main = () => {
  hideAllPaths();
  getTerrains();
  loadGame();
};

const distributeResources = async () => {
  const response = await fetch('/catan/addResourcesToPlayer', {
    method: 'POST'
  });
  if (response.ok) {
    updateGameStatus();
  }
};

const makeNormal = buildingType => {
  const element = document.getElementById(buildingType);
  element.style.transform = 'scale(1)';
};

const makeBig = buildingType => {
  const element = document.getElementById(buildingType);

  if (!Array.from(element.classList).includes('disabledUnit')) {
    element.style.transform = 'scale(1.03)';
  }
};
