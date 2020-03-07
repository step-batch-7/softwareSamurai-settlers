const getTerrains = async function() {
  const response = await fetch('/terrains');
  if (response.ok) {
    const { terrainsInfo, settlements } = await response.json();
    const terrains = document.getElementsByClassName('terrain');
    Array.from(terrains).forEach(terrain => {
      if (terrainsInfo[terrain.id].resource === 'desert') {
        const html = `<image class="terrain-image"
         xlink:href='/assets/terrains/${terrainsInfo[terrain.id].resource}.jpg'
          count="${terrainsInfo[terrain.id].noToken}"></image>
         <image id="robber" xlink:href='/assets/robber.png'></image>
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

const removeAvailableSettlements = function() {
  const settlementOptions = document.getElementsByClassName('point');
  Array.from(settlementOptions).forEach(option => {
    option.classList.remove('visibleIntersection');
    option.removeEventListener('click', buildSettlement);
  });
};

const renderNewSettlement = function(intersection) {
  removeAvailableSettlements();
  intersection.classList.remove('point');
  intersection.classList.remove('visibleIntersection');
  intersection.classList.add('afterSettlement');
  const img = `<image href='/assets/builds/settlement.svg' 
    style="height:100%; width:100%;">`;
  intersection.innerHTML = img;
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
    renderNewSettlement(intersection);
  }
};
