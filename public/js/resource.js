const updateResourceCards = function(resources, devCardsCount) {
  document.getElementById('dev-count').innerHTML = devCardsCount;
  for (const resource in resources) {
    const id = `#${resource}-count`;
    document.querySelector(id).innerHTML = resources[resource];
  }
};

const fetchCardsCount = async function() {
  const res = await fetch('/cardsCount');
  const body = await res.json();
  const { resources, totalDevCards } = await body;
  updateResourceCards(resources, totalDevCards);
};

const updateDicePhase = function(num1, num2) {
  const firstDice = document.querySelector('#dice1 img');
  const secondDice = document.querySelector('#dice2 img');
  firstDice.src = `./assets/dice/${num1}.jpg`;
  secondDice.src = `./assets/dice/${num2}.jpg`;
};

const resourceProduction = async function(dice1, dice2) {
  const reqText = JSON.stringify({ numToken: dice1 + dice2 });
  const res = await fetch('/resourceProduction', {
    method: 'POST',
    body: reqText,
    headers: { 'Content-Type': 'application/json' }
  });
  if (res.ok) {
    fetchCardsCount();
    getBankStatus();
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
  const res = await fetch('/buildStatus');
  if (res.ok) {
    const { settlement, road } = await res.json();

    updateBuildingStatus(settlement, 'settlement');
    updateBuildingStatus(road, 'road');
  }
};

const showDicePhase = async function() {
  const res = await fetch('/diceNumbers');
  const body = await res.json();
  const { dice1, dice2 } = await body;
  updateDicePhase(dice1, dice2);
  resourceProduction(dice1, dice2);
};
