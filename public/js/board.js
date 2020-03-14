const renderBoard = function(boardData) {
  const terrains = document.getElementsByClassName('terrain');
  Array.from(terrains).forEach(terrain => {
    if (boardData[terrain.id].resource === 'desert') {
      const html = `<image class="terrain-image"
           xlink:href='/catan/assets/terrains/desert.jpg'
          count="${boardData[terrain.id].noToken}"></image>
         <image id="robber"  x='0' y='30'  
          xlink:href='/catan/assets/robber.png'></image>
        `;
      terrain.innerHTML += html;
      return;
    }
    const html = `<image class="terrain-image" xlink:href=
      '/catan/assets/terrains/${boardData[terrain.id].resource}.jpg'
       count="${boardData[terrain.id].noToken}"></image>
      <circle cx="55" cy="65" r="17" fill="burlywood" opacity="0.7"/>
      <text x="45%" y="49%"  class="number-token" >
      ${boardData[terrain.id].noToken}</text>`;
    terrain.innerHTML += html;
  });
};

const hideAllPaths = () => {
  const paths = Array.from(document.querySelectorAll('.path'));
  paths.forEach(path => path.classList.add('hide'));
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

const renderBuilding = function(intersection, buildingFunction, className) {
  removeAvailableSettlements(buildingFunction);
  intersection.classList.remove('point');
  intersection.classList.remove('visibleIntersection');
  intersection.classList.add(className);
};

const addBgColor = function(element, color) {
  const colors = {
    red: 'red',
    blue: 'blue',
    green: 'rgb(14, 240, 38)',
    orange: 'rgba(255, 89, 0, 1)'
  };
  element.style.backgroundColor = colors[color];
};

const removeBgColor = function(element) {
  element.style.backgroundColor = 'transparent';
};

const requestSettlement = function() {
  fetch('/catan/requestSettlement')
    .then(res => res.json())
    .then(positions => {
      positions.forEach(position => {
        const intersection = document.getElementById(position);
        intersection.classList.add('visibleIntersection');
        intersection.addEventListener('click', buildSettlement, false);
      });
    });
};

const requestCity = function() {
  fetch('/catan/requestCity')
    .then(res => res.json())
    .then(positions => {
      positions.forEach(position => {
        const intersection = document.getElementById(position);
        intersection.classList.add('visibleIntersection');
        intersection.classList.add('point');
        intersection.addEventListener('click', buildCity, false);
      });
    });
};

const requestInitialSettlement = function() {
  fetch('/catan/requestInitialSettlement')
    .then(res => res.json())
    .then(positions => {
      positions.forEach(position => {
        const intersection = document.getElementById(position);
        intersection.classList.add('visibleIntersection');
        intersection.addEventListener('click', buildInitialSettlement, false);
      });
    });
};

const getPossiblePathsForRoad = function() {
  fetch('/catan/getPossiblePathsForRoad')
    .then(res => res.json())
    .then(({ pathIds, color }) => {
      if (document.querySelector('#road').classList.contains('disabledUnit')) {
        return;
      }
      pathIds.forEach(pathId => {
        const path = document.getElementById(pathId);
        addBgColor(path, color);
        path.classList.remove('hide');
        path.addEventListener('click', buildRoadWithResources);
      });
    });
};

const showPossiblePathsForRoadInSetUp = function() {
  fetch('/catan/getPossiblePathsForRoadInSetup')
    .then(res => res.json())
    .then(({ color, pathIds }) => {
      pathIds.forEach(pathId => {
        const path = document.getElementById(pathId);
        addBgColor(path, color);
        path.classList.remove('hide');
        path.addEventListener('click', buildRoad);
      });
    });
};

const buildRoad = function() {
  const pathId = event.target.id;
  fetch('/catan/buildRoad', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pathId })
  }).then(() => {
    removeAvailableRoads(buildRoad);
    appendRoad(pathId);
    updateGameStatus();
    loadGame();
  });
};

const buildRoadWithResources = function() {
  const pathId = event.target.id;
  fetch('/catan/buildRoadWithResources', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pathId })
  }).then(() => {
    removeAvailableRoads(buildRoadWithResources);
    appendRoad(pathId);
    updateGameStatus();
    getBuildStatus();
  });
};

const buildInitialSettlement = function() {
  const intersection = event.target;
  fetch('/catan/buildInitialSettlement', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ intersection: intersection.id })
  }).then(() => {
    renderBuilding(intersection, buildInitialSettlement);
    updateGameStatus();
    showPossiblePathsForRoadInSetUp();
  });
};

const buildSettlement = function() {
  const intersection = event.target;
  fetch('/catan/buildSettlement', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ intersection: intersection.id })
  }).then(() => {
    renderBuilding(intersection, buildSettlement, 'afterSettlement');
    updateGameStatus();
    getBuildStatus();
  });
};

const buildCity = function() {
  const intersection = event.target.parentElement;
  fetch('/catan/buildCity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cityPosition: intersection.id })
  }).then(() => {
    renderBuilding(intersection, buildCity, 'city');
    updateGameStatus();
    getBuildStatus();
  });
};
