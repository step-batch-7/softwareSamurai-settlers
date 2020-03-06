const getBankStatus = function() {
  requestHttp('GET', '/bankStatus', null, cards => {
    const bankElement = document.getElementById('bank');

    const cardNames = Object.keys(cards);
    cardNames.forEach(cardName => {
      const card = bankElement.querySelector(`#${cardName}`);
      card.querySelector('text').innerHTML = cards[cardName];
    });
  });
};

const requestHttp = (method, url, data, callBack) => {
  const req = new XMLHttpRequest();
  req.onload = function() {
    if (this.status === 200) {
      callBack(JSON.parse(this.responseText));
    }
  };
  req.open(method, url, true);
  req.send(data);
};

window.onload = getBankStatus;
