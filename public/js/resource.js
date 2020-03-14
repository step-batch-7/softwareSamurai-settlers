const flip = element => {
  const innerCard = element.parentElement.querySelector('.flip-card-inner');
  innerCard.style.animation = 'flip 3s';
  setTimeout(() => {
    innerCard.style.animation = 'none';
  }, 4000);
};

const countChangedBy = (element, previousCount, updatedCount) => {
  let countUpdatedBy = 0;
  if (updatedCount > previousCount) {
    countUpdatedBy = `+${updatedCount - previousCount}`;
  } else {
    countUpdatedBy = `-${previousCount - updatedCount}`;
  }

  element.parentElement.querySelector(
    '#count-changed-by'
  ).innerText = countUpdatedBy;
};

const updateCount = (parentElement, id, count) => {
  const element = parentElement.querySelector(`#${id}`);
  const previousCount = element.innerText;
  if (+previousCount !== count) {
    countChangedBy(element, +previousCount, count);
    element.innerText = count;
    flip(element);
  }
};

const updateCards = function(parent, resources, devCardsCount) {
  const parentElement = document.getElementById(parent);
  for (const resource in resources) {
    const id = `${resource}-count`;
    updateCount(parentElement, id, resources[resource]);
  }
};

const updateDicePhase = function(num1, num2) {
  const firstDice = document.querySelector('#dice1 img');
  const secondDice = document.querySelector('#dice2 img');
  firstDice.src = `./assets/dice/${num1}.png`;
  secondDice.src = `./assets/dice/${num2}.png`;
};

const resourceProduction = function(dice1, dice2) {
  fetch('/catan/resourceProduction')
    .then(res => res.json())
    .then(({ dice1, dice2 }) => {
      updateDicePhase(dice1, dice2);
      document.getElementById('rollDice').disabled = true;
      document.getElementById('end-turn').disabled = false;
      updateGameStatus();
      getBuildStatus();
    });
};

const updateBuildingStatus = function(status, buildingId) {
  if (status) {
    document.getElementById(buildingId).classList.remove('disabledUnit');
    return;
  }
  document.getElementById(buildingId).classList.add('disabledUnit');
};

const getBuildStatus = function() {
  fetch('/catan/buildStatus')
    .then(res => res.json())
    .then(({ settlement, road }) => {
      updateBuildingStatus(settlement, 'settlement');
      updateBuildingStatus(road, 'road');
    });
};

const distributeResources = async () => {
  const response = await fetch('/catan/addResourcesToPlayer', {
    method: 'POST'
  });
  if (response.ok) {
    updateGameStatus();
  }
};
