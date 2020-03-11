const main = function() {
  setInterval(() => {
    fetch('/playerDetails');
  }, 500);
};
