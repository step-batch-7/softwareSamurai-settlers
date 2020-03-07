const main = function() {
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
