const getTerrains = async function() {
  const response = await fetch('/catan/terrains', {
    credentials: 'include'
  });
  if (response.ok) {
    const { terrainsInfo, settlements, roads } = await response.json();
    const terrains = document.getElementsByClassName('terrain');
    Array.from(terrains).forEach(terrain => {
      if (terrainsInfo[terrain.id].resource === 'desert') {
        const html = `<image class="terrain-image"
           xlink:href='/catan/assets/terrains/desert.jpg'
          count="${terrainsInfo[terrain.id].noToken}"></image>
         <image id="robber"  x='0' y='30'  
          xlink:href='/catan/assets/robber.png'></image>
        `;
        terrain.innerHTML += html;
        return;
      }
      const html = `<image class="terrain-image" xlink:href=
      '/catan/assets/terrains/${terrainsInfo[terrain.id].resource}.jpg'
       count="${terrainsInfo[terrain.id].noToken}"></image>
      <circle cx="55" cy="65" r="17" fill="burlywood" opacity="0.7"/>
      <text x="45%" y="49%"  class="number-token" >
      ${terrainsInfo[terrain.id].noToken}</text>`;
      terrain.innerHTML += html;
    });
  }
};

const requestSettlement = async function() {
  const response = await fetch('/catan/requestSettlement', {
    credentials: 'include'
  });
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
  const response = await fetch('/catan/requestInitialSettlement', {
    credentials: 'include'
  });
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
    removeBgColor(option);
    if (!option.classList.contains('hide')) {
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
};

const buildRoad = async function() {
  const pathId = event.target.id;
  const response = await fetch('/catan/buildRoad', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ pathId })
  });
  if (response.ok) {
    appendRoad(pathId);
    updateGameStatus();
    getBuildStatus();
    removeAvailableRoads(buildRoad);
    const stage = await response.json();
    if (stage.mode === 'setup') {
      endTurn();
    }
  }
};

const buildRoadWithResources = async function() {
  const pathId = event.target.id;
  const response = await fetch('/catan/buildRoadWithResources', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pathId })
  });
  if (response.ok) {
    appendRoad(pathId);
    updateGameStatus();
    getBuildStatus();
    removeAvailableRoads(buildRoadWithResources);
  }
};

const addBgColor = function(element, color) {
  const colors = {
    red: 'red',
    blue: 'blue',
    yellow: 'rgb(255, 204, 0)',
    orange: 'rgba(255, 89, 0, 1)'
  };
  element.style.backgroundColor = colors[color];
};

const removeBgColor = function(element) {
  element.style.backgroundColor = 'transparent';
};

const showPossiblePathsForRoadInSetUp = async function() {
  const response = await fetch('/catan/getPossiblePathsForRoadInSetup', {
    credentials: 'include'
  });

  if (response.ok) {
    const { color, pathIds } = await response.json();
    pathIds.forEach(pathId => {
      const path = document.getElementById(pathId);
      addBgColor(path, color);
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
};

const buildInitialSettlement = async function() {
  const intersection = event.target;
  const response = await fetch('/catan/buildInitialSettlement', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ intersection: intersection.id })
  });

  if (response.ok) {
    renderNewSettlement(intersection, buildInitialSettlement);
    updateGameStatus();
  }
  distributeResources();
  showPossiblePathsForRoadInSetUp();
};

const buildSettlement = async function() {
  const intersection = event.target;
  const response = await fetch('/catan/buildSettlement', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ intersection: intersection.id })
  });

  if (response.ok) {
    renderNewSettlement(intersection, buildSettlement);
    updateGameStatus();
    getBuildStatus();
  }
};

const getPossiblePathsForRoad = async function() {
  const response = await fetch('/catan/getPossiblePathsForRoad', {
    credentials: 'include'
  });
  if (response.ok) {
    if (
      Array.from(document.getElementById('road').classList).includes(
        'disabledUnit'
      )
    ) {
      return;
    }
    const { pathIds, color } = await response.json();

    pathIds.forEach(pathId => {
      const path = document.getElementById(pathId);
      addBgColor(path, color);
      path.classList.remove('hide');
      path.addEventListener('click', buildRoadWithResources);
    });
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

const endTurn = async () => {
  const response = await fetch('/catan/endTurn');
  if (response.ok) {
    document.getElementById('end-turn').disabled = true;
    const actions = Array.from(document.querySelectorAll('.unit'));
    actions.forEach(action => {
      action.style.pointerEvents = 'none';
      action.style.opacity = '0.6';
    });
    loadGame();
  }
};
