const getDevelopmentCardCount = function(developmentCards) {
  return developmentCards.reduce((noOfCards, developmentCard) => {
    const [noOfDevelopmentCards] = Object.values(developmentCard);
    return noOfCards + noOfDevelopmentCards;
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
    this.developmentCards = [
      { knights: 14 },
      { monopoly: 2 },
      { roadBuilding: 2 },
      { yearOfPlenty: 2 },
      { victoryPoints: 5 }
    ];
  }

  get status() {
    const { lumber, brick, ore, wool, grain } = this.resources;
    const developmentCards = getDevelopmentCardCount(this.developmentCards);
    return { lumber, brick, ore, wool, grain, developmentCards };
  }

  remove(resources) {
    resources.forEach(resource => {
      const { count } = Object.values(resource);
      this.resources[resource] = this.resources[resource] - count;
    });
  }
}

module.exports = Bank;
