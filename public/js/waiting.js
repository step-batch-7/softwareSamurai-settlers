const requestPlayerDetails = function() {
  fetch('/catan/joinedPlayerDetails')
    .then(res => res.json())
    .then(({ playerDetails, isGameStarted }) => {
      if (isGameStarted) {
        window.location = '/catan/home.html';
      }
      Object.keys(playerDetails).forEach(color => {
        document.getElementById(color).innerText = playerDetails[color];
      });
    });
};

const main = function() {
  setInterval(requestPlayerDetails, 500);
};

window.onload = main();
