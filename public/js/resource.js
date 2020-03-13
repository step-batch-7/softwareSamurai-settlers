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

const resourceProduction = async function(dice1, dice2) {
  const reqText = JSON.stringify({ numToken: dice1 + dice2 });
  const res = await fetch('/catan/resourceProduction', {
    method: 'POST',
    body: reqText,
    headers: { 'Content-Type': 'application/json' }
  });
  if (res.ok) {
    updateGameStatus();
    requestDiceRolledStatus();
    getBuildStatus();
  }
};

const updateBuildingStatus = function(status, buildingId) {
  if (status) {
    document.getElementById(buildingId).classList.remove('disabledUnit');
    return;
  }
  document.getElementById(buildingId).classList.add('disabledUnit');
};

const getBuildStatus = async function() {
  const res = await fetch('/catan/buildStatus');
  if (res.ok) {
    const { settlement, road } = await res.json();

    updateBuildingStatus(settlement, 'settlement');
    updateBuildingStatus(road, 'road');
  }
};

const showDicePhase = async function() {
  const res = await fetch('/catan/diceNumbers');
  const body = await res.json();
  const { dice1, dice2 } = await body;
  updateDicePhase(dice1, dice2);
  document.getElementById('rollDice').disabled = true;
  document.getElementById('end-turn').disabled = false;
  resourceProduction(dice1, dice2);
};
