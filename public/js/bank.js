const getBankStatus = async function() {
  const response = await fetch('/catan/bankStatus');
  if (response.ok) {
    const cards = await response.json();
    const bankElement = document.getElementById('bank');
    const cardNames = Object.keys(cards);
    cardNames.forEach(cardName => {
      const card = bankElement.querySelector(`#${cardName}-count`);
      card.innerText = cards[cardName];
    });
  }
};
