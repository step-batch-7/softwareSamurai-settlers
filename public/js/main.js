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
  renderPlayersDetails();
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
