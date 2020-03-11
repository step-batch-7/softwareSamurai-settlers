const getTerrains = async function() {
  const response = await fetch('/catan/terrains');
  if (response.ok) {
    const { terrainsInfo, settlements, roads } = await response.json();
    const terrains = document.getElementsByClassName('terrain');
    Array.from(terrains).forEach(terrain => {
      if (terrainsInfo[terrain.id].resource === 'desert') {
        const html = `<image class="terrain-image"
         xlink:href='/assets/terrains/${terrainsInfo[terrain.id].resource}.jpg'
          count="${terrainsInfo[terrain.id].noToken}"></image>
         <image id="robber"  x='0' y='30'  
          xlink:href='/assets/robber.png'></image>
        `;
        terrain.innerHTML += html;
        return;
      }
      const html = `<image class="terrain-image" xlink:href='/assets/terrains/${
        terrainsInfo[terrain.id].resource
      }.jpg' count="${terrainsInfo[terrain.id].noToken}"></image>
      <circle cx="50" cy="55" r="17" fill="burlywood" opacity="0.7"/>
      <text x="50%" y="50%"  class="number-token" >
      ${terrainsInfo[terrain.id].noToken}</text>`;
      terrain.innerHTML += html;
    });
    renderSettlements(settlements);
    renderRoads(roads);
  }
};

const renderSettlements = function(settlements) {
  settlements.forEach(settlement => {
    const intersection = document.getElementById(settlement);
    intersection.classList.add('afterSettlement');
    const img = `<image href='/assets/settlements/blueSettlement.svg' 
    style="height:100%; width:100%;">`;
    intersection.innerHTML = img;
  });
};

const renderRoads = function(roads) {
  roads.forEach(road => {
    const path = document.getElementById(road);
    path.style.opacity = '1';
    path.classList.add('afterRoad');
    const img = `<image href='/assets/roads/blueRoad.svg' 
    class="road-image">`;
    path.innerHTML = img;
  });
};

const requestSettlement = async function() {
  const response = await fetch('/catan/requestSettlement');
  if (response.ok) {
    const positions = await response.json();

    positions.forEach(position => {
      const intersection = document.getElementById(position);
      intersection.classList.add('visibleIntersection');
      intersection.addEventListener('click', buildSettlement, false);
    });
  }
};

const requestInitialSettlement = async function() {
  const response = await fetch('/catan/requestInitialSettlement');
  if (response.ok) {
    const positions = await response.json();
    positions.forEach(position => {
      const intersection = document.getElementById(position);
      intersection.classList.add('visibleIntersection');
      intersection.addEventListener('click', buildInitialSettlement, false);
    });
  }
};

const removeAvailableSettlements = function(buildingFunction) {
  const settlementOptions = document.getElementsByClassName('point');
  Array.from(settlementOptions).forEach(option => {
    option.classList.remove('visibleIntersection');
    option.removeEventListener('click', buildingFunction);
  });
};

const removeAvailableRoads = function(buildingFunction) {
  const roadOptions = document.getElementsByClassName('path');
  Array.from(roadOptions).forEach(option => {
    if (!option.classList.includes('hide')) {
      option.classList.add('hide');
      option.removeEventListener('click', buildingFunction);
    }
  });
};

const appendRoad = function(pathId) {
  const path = document.getElementById(pathId);
  path.style.backgroundColor = 'transparent';
  path.style.opacity = 1;
  path.style.animation = 'none';
  path.classList.add('afterRoad');
  hideAllPaths();
  const img = '<image href="/assets/roads/blueRoad.svg" class="road-image">';
  path.innerHTML = img;
};

const buildRoad = async function() {
  const pathId = event.target.id;
  const response = await fetch('/catan/buildRoad', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pathId })
  });
  if (response.ok) {
    appendRoad(pathId);
    removeAvailableRoads(buildRoad);
  }
};

const buildRoadWithResources = async function() {
  const pathId = event.target.id;
  const response = await fetch('/catan/buildRoadWithResources', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pathId })
  });
  if (response.ok) {
    appendRoad(pathId);
    fetchCardsCount();
    getBankStatus();
    getBuildStatus();
    removeAvailableRoads(buildRoadWithResources);
  }
};

const showPossiblePathsForRoadInSetUp = async function() {
  const response = await fetch('/catan/getPossiblePathsForRoadInSetup');

  if (response.ok) {
    const pathIds = await response.json();
    pathIds.forEach(pathId => {
      const path = document.getElementById(pathId);
      path.classList.remove('hide');
      path.addEventListener('click', buildRoad);
    });
  }
};

const renderNewSettlement = function(intersection, buildingFunction) {
  removeAvailableSettlements(buildingFunction);
  intersection.classList.remove('point');
  intersection.classList.remove('visibleIntersection');
  intersection.classList.add('afterSettlement');
  const img = `<image href='/assets/settlements/blueSettlement.svg' 
    style="height:100%; width:100%;">`;
  intersection.innerHTML = img;
};

const buildInitialSettlement = async function() {
  const intersection = event.target;
  const response = await fetch('/catan/buildInitialSettlement', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ intersection: intersection.id })
  });

  if (response.ok) {
    renderNewSettlement(intersection, buildInitialSettlement);
  }
  distributeResources();
  showPossiblePathsForRoadInSetUp();
};

const buildSettlement = async function() {
  const intersection = event.target;
  const response = await fetch('/catan/buildSettlement', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ intersection: intersection.id })
  });

  if (response.ok) {
    renderNewSettlement(intersection, buildSettlement);
    fetchCardsCount();
    getBankStatus();
    getBuildStatus();
  }
};

const getPossiblePathsForRoad = async function() {
  const response = await fetch('/catan/getPossiblePathsForRoad');
  if (response.ok) {
    if (
      Array.from(document.getElementById('road').classList).includes(
        'disabledUnit'
      )
    ) {
      return;
    }
    const pathIds = await response.json();

    pathIds.forEach(pathId => {
      const path = document.getElementById(pathId);
      path.classList.remove('hide');
      path.addEventListener('click', buildRoadWithResources);
    });
  }
};

const renderPlayerInfo = (player, playerDetail) => {
  for (const property in playerDetail) {
    const playerPropertyElement = player.querySelector(`#${property}`);
    if (property === 'resourceCards' || property === 'developmentCards') {
      playerPropertyElement.innerHTML = playerDetail[property];
    }
    
    playerPropertyElement.innerText = playerDetail[property];
  }
};

const renderPlayersDetails = function() {
  const playersDetail = [
    {
      playerName: 'rahit',
      resourceCards: 0,
      developmentCards: 0,
      victoryPoint: 0,
      playedNightCards: 0,
      longestRoadCount: 0,
      remainingSettlement: 5,
      remainingRoads: 15,
      remainingCities: 4
    },
    {
      playerName: 'rahit',
      resourceCards: 10,
      developmentCards: 2,
      victoryPoint: 0,
      playedNightCards: 0,
      longestRoadCount: 0,
      remainingSettlement: 5,
      remainingRoads: 15,
      remainingCities: 4
    },
    {
      playerName: 'rahit',
      resourceCards: 0,
      developmentCards: 0,
      victoryPoint: 0,
      playedNightCards: 0,
      longestRoadCount: 0,
      remainingSettlement: 5,
      remainingRoads: 15,
      remainingCities: 4
    },
    {
      playerName: 'rahit',
      resourceCards: 0,
      developmentCards: 0,
      victoryPoint: 0,
      playedNightCards: 0,
      longestRoadCount: 0,
      remainingSettlement: 5,
      remainingRoads: 15,
      remainingCities: 4
    }
  ];

  playersDetail.forEach((playerDetail, index) => {
    if (index === 0) {
      const currentPlayer = document.getElementById('current-player');
      renderPlayerInfo(currentPlayer, playerDetail);
      return;
    }
    const player = document.getElementById(`player-info${index}`);
    renderPlayerInfo(player, playerDetail);
  });
};
