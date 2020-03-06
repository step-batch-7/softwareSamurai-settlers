const getTerrains = async function() {
  const response = await fetch('/terrains');
  if (response.ok) {
    const terrainsInfo = await response.json();
    const terrains = document.getElementsByClassName('terrain');
    Array.from(terrains).forEach(terrain => {
      const html = `<image class="terrain-image" xlink:href='/assets/terrains/${
        terrainsInfo[terrain.id].resource
      }.jpg' count="${terrainsInfo[terrain.id].noToken}"></image>
      <circle cx="50" cy="50" r="17" fill="burlywood" opacity="0.7"/>
      <text x="50%" y="50%"  class="number-token" >
      ${terrainsInfo[terrain.id].noToken}</text>`;
      terrain.innerHTML += html;
    });
  }
};
