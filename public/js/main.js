const hideAllPaths = () => {
  const paths = Array.from(document.querySelectorAll('.path'));
  paths.forEach(path => path.classList.add('hide'));
};

const main = () => {
  hideAllPaths();
  getTerrains();
  getBankStatus();
  fetchCardsCount();
  requestSettlement();
};

const distributeResources = async () => {
  const response = await fetch('/addResourcesToPlayer', { method: 'POST' });
  if (response.ok) {
    fetchCardsCount();
    getBankStatus();
  }
};
