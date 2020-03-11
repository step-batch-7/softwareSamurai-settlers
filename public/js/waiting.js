const main = async function() {
  setInterval(requestPlayerDetails, 500);
};

const requestPlayerDetails = async function() {
  const response = await fetch('/catan/joinedPlayerDetails');
  if (response.ok) {
    const details = await response.json();
    Object.keys(details).forEach(color => {
      document.getElementById(color).innerText = details[color];
    });
  }
};
