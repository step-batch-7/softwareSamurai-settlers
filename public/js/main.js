const hideAllPaths = () => {
  const paths = Array.from(document.querySelectorAll('.path'));
  paths.forEach(path => path.classList.add('hide'));
};

const disableMyTurn = (rollDice, endTurn) => {
  document.getElementById('rollDice').disabled = rollDice;
  document.getElementById('end-turn').disabled = endTurn;
};

// const disableAction = () => {
//   const actions = Array.from(document.querySelectorAll('.unit'));
//   actions.forEach(action => {
//     action.style.pointerEvents = 'none';
//   });
// };

const requestDiceRolledStatus = async () => {
  const response = await fetch('/catan/diceRolledStatus');
  if (response.ok) {
    const { diceRolledStatus, turn } = await response.json();
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
  const { resources, devCardCount } = player;
  updateCards('player-cards', resources, devCardCount);
};

const updateGameStatus = async function() {
  const response = await fetch('/catan/gameStatus');
  if (response.ok) {
    const { bankCards, player, otherPlayers } = await response.json();
    renderBankCards(bankCards);
    renderPlayerCards(player);
    renderPlayersInfo(otherPlayers, player);
  }
};

const loadGameStatus = async function() {
  const response = await fetch('/catan/loadGame');
  if (response.ok) {
    const { bankCards, player, otherPlayers } = await response.json();
    renderBankCards(bankCards);
    renderPlayerCards(player);
    renderPlayersInfoImgs(otherPlayers, player);
    renderPlayersInfo(otherPlayers, player);
    setSrcForAction(player.color);
  }
};

const main = () => {
  loadGameStatus();
  hideAllPaths();
  requestDiceRolledStatus();
  getTerrains();
  requestInitialSettlement();
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
