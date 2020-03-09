const getTerrains = async function() {
  const response = await fetch('/terrains');
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
    const img = `<image href='/assets/builds/settlement.svg' 
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
  const response = await fetch('/requestSettlement');
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
  const response = await fetch('/requestSettlement');
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

const buildRoad = async function(pathId) {
  const response = await fetch('/buildRoad', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pathId })
  });
  if (response.ok) {
    const path = document.getElementById(pathId);
    path.style.backgroundColor = 'transparent';
    path.style.opacity = 1;
    path.style.animation = 'none';
    path.classList.add('afterRoad');
    hideAllPaths();
    const img = '<image href="/assets/roads/blueRoad.svg" class="road-image">';
    path.innerHTML = img;
  }
};

const showPossiblePathsForRoadInSetUp = async function() {
  const response = await fetch('/servePossiblePathsForRoadInSetup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const pathIds = await response.json();
    pathIds.forEach(pathId => {
      const path = document.getElementById(pathId);
      path.classList.remove('hide');
      path.addEventListener('click', buildRoad.bind(null, pathId));
    });
  }
};

const renderNewSettlement = function(intersection, buildingFunction) {
  removeAvailableSettlements(buildingFunction);
  intersection.classList.remove('point');
  intersection.classList.remove('visibleIntersection');
  intersection.classList.add('afterSettlement');
  const img = `<image href='/assets/builds/settlement.svg' 
    style="height:100%; width:100%;">`;
  intersection.innerHTML = img;
};

const buildInitialSettlement = async function() {
  const intersection = event.target;
  const response = await fetch('/buildInitialSettlement', {
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
  const response = await fetch('/buildSettlement', {
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
  }
};

const getPossiblePathsForRoad = async function() {
  const response = await fetch('/getPossiblePathsForRoad');
  if (response.ok) {
    const pathIds = await response.json();
    pathIds.forEach(pathId => {
      const path = document.getElementById(pathId);
      path.classList.remove('hide');
      path.addEventListener('click', buildRoad.bind(null, pathId));
    });
  }
};
