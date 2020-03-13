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

  haveResource(resource, count) {
    const presentCount = this.resources[resource];
    return presentCount - count >= 0;
  }

  remove({ resource, count }) {
    if (resource && count && this.haveResource(resource, count)) {
      this.resources[resource] = this.resources[resource] - count;
      return true;
    }
    return false;
  }

  add(resources) {
    for (const resource in resources) {
      const totalResources = this.resources[resource] + resources[resource];
      if (totalResources > 19) {
        return false;
      }
      this.resources[resource] += resources[resource];
    }
    return true;
  }
  getDevCard() {
    const { developmentCards } = this;
    const num = Math.floor(Math.random() * 5);
    const developmentCard = developmentCards[num];
    const [card] = Object.keys(developmentCard);
    if (developmentCards[num][card]) {
      developmentCards[num][card] -= 1;
      return card;
    }
  }
}

module.exports = { Bank };
