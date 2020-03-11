const main = async function() {
  setInterval(requestPlayerDetails, 500);
};

const requestPlayerDetails = async function() {
  const response = await fetch('/catan/joinedPlayerDetails');
  if (response.ok) {
    const { playerDetails, isGameStarted } = await response.json();
    if (isGameStarted) {
      window.location = '/catan/home.html';
    }
    Object.keys(playerDetails).forEach(color => {
      document.getElementById(color).innerText = playerDetails[color];
    });
  }
};
