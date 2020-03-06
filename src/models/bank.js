const getDevelopmentCardCount = function(developmentCards) {
  const developmentCardNames = Object.keys(developmentCards);
  return developmentCardNames.reduce((noOfCards, developmentCardName) => {
    return noOfCards + developmentCards[developmentCardName];
  }, 0);
};

class Bank {
  constructor() {
    this.resources = {
      lumber: 19,
      brick: 19,
      ore: 19,
      wool: 19,
      grain: 19
    };
    this.developmentCards = {
      knights: 14,
      monopoly: 2,
      roadBuilding: 2,
      yearOfPlenty: 2,
      victoryPoints: 5
    };
  }

  getBankStatus() {
    const { lumber, brick, ore, wool, grain } = this.resources;
    const developmentCards = getDevelopmentCardCount(this.developmentCards);
    return { lumber, brick, ore, wool, grain, developmentCards };
  }
}

module.exports = Bank;
