const { assert } = require('chai');
const sinon = require('sinon');
const { Game } = require('../../src/models/game');
const { Player } = require('../../src/models/player');

describe('Game', () => {
  describe('cardsCount', () => {
    it('should give cardsCount for the given player', () => {
      const players = {
        1: Player.initialize(),
        2: Player.initialize(),
        3: Player.initialize(),
        4: Player.initialize()
      };
      const game = new Game();
      sinon.replace(game, 'players', players);
      const expected = {
        resources: {
          ore: 0,
          wool: 0,
          lumber: 0,
          brick: 0,
          grain: 0
        },
        devCards: {
          knight: 0,
          yearOfPlenty: 0,
          roadBuilding: 0,
          monoPoly: 0
        },
        totalDevCards: 0
      };
      assert.deepStrictEqual(game.cardsCount(1), expected);
    });
  });

  describe('bankStatus', () => {
    it('should return the status of the bank', () => {
      const game = new Game();
      const actual = game.bankStatus();
      const expected = {
        lumber: 19,
        brick: 19,
        ore: 19,
        wool: 19,
        grain: 19,
        developmentCards: 25
      };
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('addRoad', () => {
    it('should add the road to Game when pathId is valid', () => {
      const players = {
        1: Player.initialize(),
        2: Player.initialize(),
        3: Player.initialize(),
        4: Player.initialize()
      };
      const game = new Game();
      sinon.replace(game, 'players', players);
      assert.isTrue(game.addRoad(1, 'kl-klr'));
    });

    it('should not add the road to Game when pathId is undefined ', () => {
      const game = new Game();
      assert.isFalse(game.addRoad());
    });

    it('should not add the road to Game when pathId is invalid ', () => {
      const game = new Game();
      assert.isFalse(game.addRoad('abc-def'));
    });
  });

  describe('getAvailableAdjSettlements ', () => {
    it('should give empty array if no positions are available', () => {
      const players = {
        1: Player.initialize(),
        2: Player.initialize(),
        3: Player.initialize(),
        4: Player.initialize()
      };
      const game = new Game();
      sinon.replace(game, 'players', players);
      assert.deepStrictEqual(game.getAvailableAdjSettlements(1), []);
    });
  });
  describe('start', () => {
    it('should start the game when 4 players are added', () => {
      const players = {
        p1: Player.initialize('red'),
        p2: Player.initialize('green'),
        p3: Player.initialize('orange'),
        p4: Player.initialize('white')
      };
      const game = new Game();
      sinon.replace(game, 'players', players);
      assert.isTrue(game.start());
    });

    it('should start the game when no player is joined', () => {
      const game = new Game();
      assert.isFalse(game.start());
    });

    it('should not start the game when less than 4 players are added', () => {
      const players = {
        p1: Player.initialize('red'),
        p2: Player.initialize('green'),
        p3: Player.initialize('orange')
      };
      const game = new Game();
      sinon.replace(game, 'players', players);
      assert.isFalse(game.start());
    });
  });

  describe('hasStarted', () => {
    it('should return true when the game has started', () => {
      const players = {
        p1: Player.initialize('red'),
        p2: Player.initialize('green'),
        p3: Player.initialize('orange'),
        p4: Player.initialize('white')
      };
      const game = new Game();
      sinon.replace(game, 'players', players);
      game.start();
      assert.isTrue(game.hasStarted());
    });
    it('should return false when the has not started', () => {
      const game = new Game();
      assert.isFalse(game.hasStarted());
    });
  });

  describe('resourceProduction', () => {
    it('should produce resources according to numToken', () => {
      const players = {
        p1: Player.initialize('p1'),
        p2: Player.initialize('p2'),
        p3: Player.initialize('p3'),
        p4: Player.initialize('p4')
      };
      players['p1'].settlements.push('efo');
      players['p3'].settlements.push('bcn');
      players['p4'].settlements.push('klr');

      const game = new Game();
      sinon.replace(game, 'players', players);
      sinon.replace(game.diceNumbers, 'dice1', 3);
      sinon.replace(game.diceNumbers, 'dice2', 2);

      assert.isTrue(game.resourceProduction());
      const actualPlayer1Resources = players['p1'].resources.status();
      const actualPlayer2Resources = players['p2'].resources.status();
      const actualPlayer3Resources = players['p3'].resources.status();
      const actualPlayer4Resources = players['p4'].resources.status();
      const actualBankResources = game.bank.resources;

      const expectedPlayer1Resources = {
        ore: 0,
        wool: 1,
        lumber: 0,
        brick: 0,
        grain: 0
      };

      const expectedPlayer2Resources = {
        ore: 0,
        wool: 0,
        lumber: 0,
        brick: 0,
        grain: 0
      };

      const expectedPlayer3Resources = {
        ore: 0,
        wool: 0,
        lumber: 0,
        brick: 1,
        grain: 0
      };

      const expectedPlayer4Resources = {
        ore: 0,
        wool: 0,
        lumber: 0,
        brick: 0,
        grain: 0
      };

      const expectedBankResources = {
        ore: 19,
        wool: 18,
        lumber: 19,
        brick: 18,
        grain: 19
      };

      assert.deepStrictEqual(actualBankResources, expectedBankResources);
      assert.deepStrictEqual(actualPlayer1Resources, expectedPlayer1Resources);
      assert.deepStrictEqual(actualPlayer2Resources, expectedPlayer2Resources);
      assert.deepStrictEqual(actualPlayer3Resources, expectedPlayer3Resources);
      assert.deepStrictEqual(actualPlayer4Resources, expectedPlayer4Resources);
    });
  });

  describe('getPlayerDetails', () => {
    it('should get player details of single player', () => {
      const game = new Game();
      game.addPlayer('virat');
      assert.deepStrictEqual({ blue: 'virat' }, game.getPlayerDetails());
    });
  });
  describe('build settlement', () => {
    it('should build a settlement and return true when cards are deducted', () => {
      const game = new Game();
      const players = {
        p1: Player.initialize('p1'),
        p2: Player.initialize('p2'),
        p3: Player.initialize('p3'),
        p4: Player.initialize('p4')
      };
      players['p2'].resources = { deduct: sinon.stub().returns(true) };
      sinon.replace(game, 'players', players);
      assert.isTrue(game.buildSettlement('kl', 'p2'));
    });
  });

  it('should build a settlement and return true when cards are deducted', () => {
    const game = new Game();
    const players = {
      p1: Player.initialize('p1'),
      p2: Player.initialize('p2'),
      p3: Player.initialize('p3'),
      p4: Player.initialize('p4')
    };
    sinon.replace(game, 'players', players);
    assert.isFalse(game.buildSettlement('kl', 'p2'));
  });

  describe('toggleDiceRolledStatus', () => {
    it('should toggle status to false when  diceRolledStatus is true', () => {
      const game = new Game();
      sinon.replace(game, 'diceRolledStatus', true);
      game.toggleDiceRolledStatus();
      assert.isFalse(game.getDiceRolledStatus());
    });
    sinon.restore();
    it('should toggle status to true when  diceRolledStatus is false', () => {
      const game = new Game();
      game.toggleDiceRolledStatus();
      assert.isTrue(game.getDiceRolledStatus());
    });
  });
});

describe('getDiceRolledStatus', () => {
  it('should give true when  diceRolledStatus is true', () => {
    const game = new Game();
    sinon.replace(game, 'diceRolledStatus', true);
    assert.isTrue(game.getDiceRolledStatus());
  });
  sinon.restore();
  it('should give false when  diceRolledStatus is false', () => {
    const game = new Game();
    assert.isFalse(game.getDiceRolledStatus());
  });
});

describe('status', function() {
  it('should give status of the game for given player', function() {
    const game = new Game();
    game.addPlayer('p1');
    game.addPlayer('p2');
    game.addPlayer('p3');
    game.addPlayer('p4');
    const expected = {
      bankCards: {
        brick: 19,
        developmentCards: 25,
        grain: 19,
        lumber: 19,
        ore: 19,
        wool: 19
      },
      otherPlayers: [
        {
          army: 0,
          color: 'green',
          devCardCount: 0,
          longestRoad: 0,
          name: 'p3',
          resourceCount: 0,
          roads: [],
          settlements: [],
          victoryPoints: 0,
          turn: false,
          cities: []
        },
        {
          army: 0,
          color: 'orange',
          devCardCount: 0,
          longestRoad: 0,
          name: 'p4',
          resourceCount: 0,
          roads: [],
          settlements: [],
          victoryPoints: 0,
          turn: false,
          cities: []
        },
        {
          army: 0,
          color: 'blue',
          devCardCount: 0,
          longestRoad: 0,
          name: 'p1',
          resourceCount: 0,
          roads: [],
          settlements: [],
          victoryPoints: 0,
          turn: true,
          cities: []
        }
      ],
      player: {
        army: 0,
        color: 'red',
        devCardCount: 0,
        devCards: {
          knight: 0,
          monoPoly: 0,
          roadBuilding: 0,
          yearOfPlenty: 0
        },
        longestRoad: 0,
        name: 'p2',
        resourceCount: 0,
        resources: {
          brick: 0,
          grain: 0,
          lumber: 0,
          ore: 0,
          wool: 0
        },
        roads: [],
        settlements: [],
        turn: false,
        victoryPoints: 0,
        cities: []
      },
      stage: {
        build: '',
        mode: 'setup'
      },
      diceNumbers: {
        dice1: 1,
        dice2: 6
      }
    };
    assert.deepStrictEqual(game.status('2'), expected);
  });
});

describe('passTurn', () => {
  it('should end the turn and return true for valid playerId', () => {
    const game = new Game();
    game.addPlayer('virat');
    game.addPlayer('rohit');
    game.addPlayer('shikhar');
    game.addPlayer('dhoni');
    assert.isTrue(game.passTurn('1'));
  });

  it('should end the turn and return false for when playerId is not current playerId', () => {
    const game = new Game();
    game.addPlayer('virat');
    game.addPlayer('rohit');
    game.addPlayer('shikhar');
    game.addPlayer('dhoni');
    assert.isFalse(game.passTurn('2'));
  });
});

describe('addRoadWithResources', () => {
  it('should add road and deduct resources of given player', () => {
    const game = new Game();
    game.addPlayer('john');
    game.players['1'].addResources({ resource: 'lumber', count: 1 });
    game.players['1'].addResources({ resource: 'brick', count: 1 });
    assert.isTrue(game.addRoadWithResources('1', 'k1-k9'));
  });
});

describe('passTurn', () => {
  it('should change to normal mode when setup mode is done', () => {
    const game = new Game();
    game.addPlayer('1');
    game.addPlayer('2');
    game.addPlayer('3');
    game.addPlayer('4');
    sinon.replace(game.turn, 'changeTurn', () => false);
    game.passTurn('1');
    assert.deepEqual(game.stage.mode, 'normal');
  });
});

describe('distribute', () => {
  it('should distribute specified Cards from bank to all players', () => {
    const game = new Game();
    game.addPlayer('1');
    game.distribute(game.players['1'], [
      {
        resource: 'lumber',
        count: 1
      },
      { resource: 'ore', count: 2 }
    ]);
    const bank = {
      brick: 19,
      developmentCards: 25,
      grain: 19,
      lumber: 18,
      ore: 17,
      wool: 19
    };
    const player = {
      devCards: {
        knight: 0,
        monoPoly: 0,
        roadBuilding: 0,
        yearOfPlenty: 0
      },
      resources: {
        brick: 0,
        grain: 0,
        lumber: 1,
        ore: 2,
        wool: 0
      },
      totalDevCards: 0
    };
    assert.deepStrictEqual(game.cardsCount('1'), player);
    assert.deepStrictEqual(game.bankStatus(), bank);
  });
  it('should not add to player when bank has no resources', () => {
    const game = new Game();
    game.addPlayer('1');
    sinon.replace(game.bank, 'haveResource', () => false);
    assert.isFalse(
      game.distribute(game.players['1'], [{ resource: 'brick', count: 1 }])
    );
  });
});

describe('possibleCites', () => {
  it('should give possible positions for building cities for given player id', () => {
    const game = new Game();
    const playerId = game.addPlayer('p1');
    game.buildInitialSettlement('hi', playerId);
    const actual = game.possibleCities(playerId);
    const expected = ['hi'];
    assert.deepStrictEqual(actual, expected);
  });

  it('should give empty list player id having no place to build a city', () => {
    const game = new Game();
    const playerId = game.addPlayer('p1');
    const actual = game.possibleCities(playerId);
    assert.deepStrictEqual(actual, []);
  });
});

describe('canBuild', () => {
  it('Should give true for player having resources to build road', () => {
    const game = new Game();
    const playerId = game.addPlayer('John');
    game.players[playerId].addResources({ resource: 'lumber', count: 1 });
    game.players[playerId].addResources({ resource: 'brick', count: 1 });
    const actual = game.canBuild(playerId);
    const expected = { road: true, settlement: false, city: false };
    assert.deepStrictEqual(actual, expected);
  });
  it('Should give false for player having no resources to build road', () => {
    const game = new Game();
    const playerId = game.addPlayer('John');
    game.players[playerId].addResources({ resource: 'brick', count: 1 });
    const actual = game.canBuild(playerId);
    const expected = { road: false, settlement: false, city: false };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should give true for player having resources and place to build settlement', () => {
    const game = new Game();
    const playerId = game.addPlayer('John');
    game.addRoad(playerId, 'kl-klr');
    game.addRoad(playerId, 'klr-lmr');
    game.players[playerId].addResources({ resource: 'lumber', count: 1 });
    game.players[playerId].addResources({ resource: 'brick', count: 1 });
    game.players[playerId].addResources({ resource: 'grain', count: 1 });
    game.players[playerId].addResources({ resource: 'wool', count: 1 });
    const actual = game.canBuild(playerId);
    const expected = { road: true, settlement: true, city: false };
    assert.deepStrictEqual(actual, expected);
  });
  it('Should give false for player having resources but no place to build settlement', () => {
    const game = new Game();
    const playerId = game.addPlayer('John');
    game.players[playerId].addResources({ resource: 'lumber', count: 1 });
    game.players[playerId].addResources({ resource: 'brick', count: 1 });
    game.players[playerId].addResources({ resource: 'grain', count: 1 });
    game.players[playerId].addResources({ resource: 'wool', count: 1 });
    const actual = game.canBuild(playerId);
    const expected = { road: true, settlement: false, city: false };
    assert.deepStrictEqual(actual, expected);
  });
  it('Should give false for player having no resources and no place to build settlement', () => {
    const game = new Game();
    const playerId = game.addPlayer('John');
    game.players[playerId].addResources({ resource: 'lumber', count: 1 });
    const actual = game.canBuild(playerId);
    const expected = { road: false, settlement: false, city: false };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should give true for player having resources and place to build city', () => {
    const game = new Game();
    const playerId = game.addPlayer('John');
    game.buildInitialSettlement('klr', playerId);
    game.players[playerId].addResources({ resource: 'grain', count: 2 });
    game.players[playerId].addResources({ resource: 'ore', count: 3 });
    const actual = game.canBuild(playerId);
    const expected = { road: false, settlement: false, city: true };
    assert.deepStrictEqual(actual, expected);
  });
  it('Should give false for player having no resources and no place to build city', () => {
    const game = new Game();
    const playerId = game.addPlayer('John');
    game.players[playerId].addResources({ resource: 'lumber', count: 1 });
    const actual = game.canBuild(playerId);
    const expected = { road: false, settlement: false, city: false };
    assert.deepStrictEqual(actual, expected);
  });
  it('Should give false for player having resources and no place to build  city', () => {
    const game = new Game();
    const playerId = game.addPlayer('John');
    game.players[playerId].addResources({ resource: 'grain', count: 2 });
    game.players[playerId].addResources({ resource: 'ore', count: 3 });
    const actual = game.canBuild(playerId);
    const expected = { road: false, settlement: false, city: false };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('updateDice', function() {
  it('should update dice values', function() {
    const game = new Game();
    game.updateDice(3, 4);
    assert.deepEqual(game.diceNumbers, { dice1: 3, dice2: 4 });
  });
});

describe('buildCity', () => {
  it('should give false when the player does not have enough resources', () => {
    const game = new Game();
    const playerId = game.addPlayer('p1');
    assert.isFalse(game.buildCity(playerId, 'k1'));
  });

  it('should give true when the player have enough resources and previous settlements to upgrade to city', () => {
    const game = new Game();
    const playerId = game.addPlayer('p1');
    game.players[playerId].addSettlement('k1');
    game.players[playerId].addResources({ resource: 'ore', count: 3 });
    game.players[playerId].addResources({ resource: 'grain', count: 2 });
    assert.isTrue(game.buildCity(playerId, 'k1'));
  });
});

describe('addResourcesToPlayer', function() {
  it('should add resource to player when they build second settlement', function() {
    const game = new Game();
    game.addPlayer('virat');
    game.addPlayer('rohit');
    game.addPlayer('shikhar');
    game.addPlayer('dhoni');
    sinon.replace(game.players['1'], 'settlements', ['b1', 'efo']);
    game.addResourcesToPlayer('1');
    const actualPlayerResources = game.players['1'].resources.status();
    const actualBankResources = game.bank.resources;

    const expectedPlayerResources = {
      ore: 0,
      wool: 2,
      lumber: 0,
      brick: 0,
      grain: 1
    };

    const expectedBankResources = {
      ore: 19,
      wool: 17,
      lumber: 19,
      brick: 19,
      grain: 18
    };

    assert.deepStrictEqual(actualBankResources, expectedBankResources);
    assert.deepStrictEqual(actualPlayerResources, expectedPlayerResources);
  });
});
