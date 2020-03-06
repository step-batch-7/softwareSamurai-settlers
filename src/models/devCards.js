class DevCards {
  constructor() {
    this.knight = 0;
    this.yearOfPlenty = 0;
    this.roadBuilding = 0;
    this.monoPoly = 0;
    this.victoryCards = {
      library: 0,
      chapel: 0,
      greatHall: 0,
      market: 0,
      university: 0
    };
  }
  count() {
    return {
      knight: this.knight,
      yearOfPlenty: this.yearOfPlenty,
      roadBuilding: this.roadBuilding,
      monoPoly: this.monoPoly,
      victoryCards: this.victoryCards
    };
  }
}

module.exports = DevCards;
