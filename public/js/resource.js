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
  const {resources, totalDevCards} = await body;
  updateResourceCards(resources, totalDevCards);
};
