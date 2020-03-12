const hideAllPaths = () => {
  const paths = Array.from(document.querySelectorAll('.path'));
  paths.forEach(path => path.classList.add('hide'));
};

const requestDiceRolledStatus = async () => {
  const response = await fetch('/catan/diceRolledStatus');
  if (response.ok) {
    const {diceRolledStatus} = await response.json();
    if (diceRolledStatus) {
      document.getElementById('rollDice').disabled = true;
      return;
    }
    document.getElementById('rollDice').disabled = false;
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
  const players = [player, ...otherPlayers];
  players.forEach((player, index) => {
    const playerElement = document.querySelector(`#player-info${index}`);
    renderPlayerInfo1(playerElement, player);
  });
};

const renderBankCards = function(bankCards) {
  const bankElement = document.getElementById('bank');
  const cardNames = Object.keys(bankCards);
  cardNames.forEach(cardName => {
    const card = bankElement.querySelector(`#${cardName}`);
    card.querySelector('text').innerHTML = bankCards[cardName];
  });
};

const renderPlayerCards = function(player) {
  const {resources, devCardCount} = player;
  document.getElementById('dev-count').innerHTML = devCardCount;
  for (const resource in resources) {
    const id = `#${resource}-count`;
    document.querySelector(id).innerHTML = resources[resource];
  }
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

const main = () => {
  updateGameStatus();
  hideAllPaths();
  requestDiceRolledStatus();
  getTerrains();
  requestInitialSettlement();
  renderPlayersInfoImgs();
  // renderPlayersDetails();
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
