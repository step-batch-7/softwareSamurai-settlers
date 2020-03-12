const hideAllPaths = () => {
  const paths = Array.from(document.querySelectorAll('.path'));
  paths.forEach(path => path.classList.add('hide'));
};

const disableMyTurn = (rollDice, endTurn) => {
  document.getElementById('rollDice').disabled = rollDice;
  document.getElementById('end-turn').disabled = endTurn;
};

const requestDiceRolledStatus = async () => {
  const response = await fetch('/catan/diceRolledStatus');
  if (response.ok) {
    const {diceRolledStatus, turn} = await response.json();
    if (turn) {
      disableMyTurn(false, true);
      if (diceRolledStatus) {
        disableMyTurn(true, false);
        getBuildStatus();
      }
      return;
    }
    disableMyTurn(true, true);
  }
};

const getRemainingCount = function(asset, maxCount) {
  return maxCount - asset.length;
};

const renderPlayerInfo1 = function(playerElement, player) {
  const {
    resourceCardCount,
    devCardCount,
    settlements,
    roads,
    cities,
    army,
    victoryPoints,
    longestRoad
  } = player;

  playerElement.querySelector('#resource-cards').innerText = resourceCardCount;
  playerElement.querySelector('#development-cards').innerText = devCardCount;
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
  const {resources, devCardCount} = player;
  updateCards('player-cards', resources, devCardCount);
};

const updateGameStatus = async function() {
  const response = await fetch('/catan/gameStatus');
  if (response.ok) {
    const {bankCards, player, otherPlayers} = await response.json();
    renderBankCards(bankCards);
    renderPlayerCards(player);
    renderPlayersInfo(otherPlayers, player);
  }
};

const render = function(game) {
  const {bankCards, player, otherPlayers} = game;
  renderBankCards(bankCards);
  renderPlayerCards(player);
  renderPlayersInfoImgs(otherPlayers, player);
};

const setupMode = function(game) {
  const {player, stage} = game;
  if (player.turn && stage.mode === 'setup') {
    if (stage.build === 'settlement') {
      showPossiblePathsForRoadInSetUp();
      return;
    }
    requestInitialSettlement();
  }
};

const loadGameStatus = async function() {
  const response = await fetch('/catan/loadGame');
  if (response.ok) {
    const game = await response.json();
    hideAllPaths();
    getTerrains();
    render(game);
    setSrcForAction(game.player.color);
    setupMode(game);
  }
};

const main = () => {
  loadGameStatus();
  updateGameStatus();
  requestDiceRolledStatus();
};

const distributeResources = async () => {
  const response = await fetch('/catan/addResourcesToPlayer', {
    method: 'POST'
  });
  if (response.ok) {
    fetchCardsCount();
    getBankStatus();
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
