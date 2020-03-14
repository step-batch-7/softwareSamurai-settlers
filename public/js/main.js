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

const setSrc = ({ element, dirName, color, buildingType, extension }) => {
  element
    .querySelector(`#${buildingType}Img`)
    .setAttribute(
      'src',
      `/catan/assets/${dirName}/${color}-${buildingType}.${extension}`
    );
};

const setSrcForAction = color => {
  const element = document.getElementById('actions');
  setSrc({
    element,
    dirName: 'roads',
    color: color,
    buildingType: 'road',
    extension: 'svg'
  });
  setSrc({
    element,
    dirName: 'settlements',
    color: color,
    buildingType: 'settlement',
    extension: 'svg'
  });
};

const renderPlayersInfoImgs = (otherPlayers, player) => {
  const players = [player, ...otherPlayers];
  players.forEach((player, index) => {
    const element = document.getElementById(`player-info${index}`);
    element.querySelector('#playerName').innerText = player.name;
    setSrc({
      element,
      dirName: 'roads',
      color: player.color,
      buildingType: 'road',
      extension: 'svg'
    });
    setSrc({
      element,
      dirName: 'settlements',
      color: player.color,
      buildingType: 'settlement',
      extension: 'svg'
    });
    setSrc({
      element,
      dirName: 'cities',
      color: player.color,
      buildingType: 'city',
      extension: 'svg'
    });
    setSrc({
      element,
      dirName: 'players',
      color: player.color,
      buildingType: 'player',
      extension: 'png'
    });
  });
};

const disableTurn = (rollDice, endTurn) => {
  const endTurnButton = document.getElementById('end-turn');
  const rollDiceButton = document.getElementById('rollDice');
  rollDiceButton.disabled = rollDice;
  rollDiceButton.style.pointerEvents = rollDice ? 'none' : 'auto';
  endTurnButton.disabled = endTurn;
  endTurnButton.style.opacity = endTurn ? '0.6' : '1';
};

const enablePlayerTurn = diceRolledStatus => {
  if (diceRolledStatus) {
    disableTurn(true, false);
    getBuildStatus();
    return;
  }
  disableTurn(false, true);
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

const getRemainingCount = function(asset, maxCount) {
  return maxCount - asset.length;
};

const renderPlayerInfo = function(playerElement, player) {
  const {
    resourceCount,
    devCardCount,
    settlements,
    roads,
    cities,
    army,
    victoryPoints,
    longestRoad
  } = player;

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

const highlightPlayer = (otherPlayers, player) => {
  const players = [player, ...otherPlayers];
  const lastPlayer = document.querySelector('.highlight');
  if (lastPlayer) {
    lastPlayer.classList.remove('highlight');
    lastPlayer.style.backgroundColor = 'rgba(235, 233, 227, 0.377)';
  }
  players.forEach((player, index) => {
    if (player.turn) {
      const playerElement = document.querySelector(`#player-info${index}`);
      playerElement.style.border = 'none';
      playerElement.style.backgroundColor = 'rgba(245, 245, 245, 0.8)';
      playerElement.classList.add('highlight');
    }
  });
};

const endTurn = () => {
  fetch('/catan/endTurn').then(res => {
    document.getElementById('end-turn').disabled = true;
    const actions = Array.from(document.querySelectorAll('.unit'));
    actions.slice(0, -1).forEach(action => {
      action.style.pointerEvents = 'none';
      action.style.opacity = '0.6';
    });
    loadGame();
  });
};

const requestDiceRolledStatus = async () => {
  const response = await fetch('/catan/diceRolledStatus');
  if (response.ok) {
    const { diceRolledStatus, turn, mode } = await response.json();
    if (turn && mode === 'normal') {
      enablePlayerTurn(diceRolledStatus);
      return;
    }
    disableTurn(true, true);
  }
};

const renderPlayersRoads = function(player, otherPlayers) {
  const players = [player, ...otherPlayers];
  players.forEach(player => renderRoads(player.roads, player.color));
};

const renderPlayersSettlements = function(player, otherPlayers) {
  const players = [player, ...otherPlayers];
  players.forEach(player =>
    renderSettlements(player.settlements, player.color)
  );
};

const renderPlayersInfo = function(otherPlayers, player) {
  if (!player.turn) {
    document.getElementById('rollDice').disabled = true;
  }
  const players = [player, ...otherPlayers];
  players.forEach((player, index) => {
    const playerElement = document.querySelector(`#player-info${index}`);
    renderPlayerInfo(playerElement, player);
  });
};

const renderBankCards = function(bankCards) {
  updateCards('bank', bankCards);
};

const renderPlayerCards = function(player) {
  const { resources, devCardCount } = player;
  updateCards('player-cards', resources, devCardCount);
};

const renderDice = function({ dice1, dice2 }) {
  updateDicePhase(dice1, dice2);
};

const render = function(game) {
  const { bankCards, player, otherPlayers } = game;
  renderBankCards(bankCards);
  renderPlayerCards(player);
  renderPlayersInfo(otherPlayers, player);
  renderPlayersSettlements(player, otherPlayers);
  renderPlayersRoads(player, otherPlayers);
  highlightPlayer(otherPlayers, player);
  renderDice(game.diceNumbers);
};

const updateGameStatus = function() {
  fetch('/catan/gameStatus')
    .then(res => res.json())
    .then(game => {
      render(game);
    });
};

const setupMode = function(player, stage) {
  if (player.turn && stage.mode === 'setup') {
    // if (stage.build === 'settlement') {
    //   showPossiblePathsForRoadInSetUp();
    //   return;
    // }
    requestInitialSettlement();
  }
};

const loadGame = function() {
  const updateGame = setInterval(() => {
    fetch('/catan/gameStatus')
      .then(res => res.json())
      .then(game => {
        if (game.player.turn) {
          clearInterval(updateGame);
          setupMode(game.player, game.stage);
          requestDiceRolledStatus();
        }
        render(game);
      });
  }, 1000);
};

const loadPage = function() {
  fetch('/catan/loadGame')
    .then(res => res.json())
    .then(({ status, boardData }) => {
      renderBoard(boardData);
      renderPlayersInfoImgs(status.otherPlayers, status.player);
      setSrcForAction(status.player.color);
      loadGame();
    });
};

const main = () => {
  hideAllPaths();
  loadPage();
};

const showDevCardOption = () => {
  const devCardOptionBox = document.querySelector('#devCardOptionBox');
  if (devCardOptionBox.style.display === 'none') {
    devCardOptionBox.style.display = 'block';
    return;
  }
  devCardOptionBox.style.display = 'none';
};

const buyDevCard = () => {};
