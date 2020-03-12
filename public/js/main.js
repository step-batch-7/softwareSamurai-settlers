const hideAllPaths = () => {
  const paths = Array.from(document.querySelectorAll('.path'));
  paths.forEach(path => path.classList.add('hide'));
};

const requestDiceRolledStatus = async () => {
  const response = await fetch('/catan/diceRolledStatus');
  if (response.ok) {
    const { diceRolledStatus } = await response.json();
    if (diceRolledStatus) {
      document.getElementById('rollDice').disabled = true;
      return;
    }
    document.getElementById('rollDice').disabled = false;
  }
};

const main = () => {
  hideAllPaths();
  requestDiceRolledStatus();
  getTerrains();
  getBankStatus();
  fetchCardsCount();
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
