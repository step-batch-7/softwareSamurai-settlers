const hideAllPaths = () => {
  const allRoads = document.querySelector('.allRoads');
  allRoads.classList.add('hide');
  const paths = Array.from(allRoads.querySelectorAll('svg'));
  paths.forEach(path => path.classList.add('hide'));
};

const main = () => {
  getTerrains();
  getBankStatus();
  fetchCardsCount();
  requestSettlement();
  hideAllPaths();
};

const distributeResources = async () => {
  const response = await fetch('/addResourcesToPlayer', { method: 'POST' });
  if (response.ok) {
    fetchCardsCount();
    getBankStatus();
  }
};
