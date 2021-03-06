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

  get victoryCardsCount() {
    const {library, chapel, greatHall, market, university} = this.victoryCards;
    return library + chapel + greatHall + market + university;
  }

  status() {
    return {
      knight: this.knight,
      yearOfPlenty: this.yearOfPlenty,
      roadBuilding: this.roadBuilding,
      monoPoly: this.monoPoly
    };
  }
  count() {
    const progCards = this.yearOfPlenty + this.roadBuilding + this.monoPoly;
    const {library, chapel, greatHall, market, university} = this.victoryCards;
    const victoryCards = library + chapel + greatHall + market + university;
    return this.knight + progCards + victoryCards;
  }
}

module.exports = DevCards;
