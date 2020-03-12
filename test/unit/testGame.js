const { assert } = require('chai');
const sinon = require('sinon');
const { Game } = require('../../src/models/game');
const { Player } = require('../../src/models/player');

describe('Game', () => {
  describe('cardsCount', () => {
    it('should give cardsCount for the given player', () => {
      const players = {
        1: new Player(),
        2: new Player(),
        3: new Player(),
        4: new Player()
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
        1: new Player(),
        2: new Player(),
        3: new Player(),
        4: new Player()
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
        1: new Player(),
        2: new Player(),
        3: new Player(),
        4: new Player()
      };
      const game = new Game();
      sinon.replace(game, 'players', players);
      assert.deepStrictEqual(game.getAvailableAdjSettlements(1), []);
    });
  });
  describe('start', () => {
    it('should start the game when 4 players are added', () => {
      const players = {
        p1: new Player('red'),
        p2: new Player('green'),
        p3: new Player('orange'),
        p4: new Player('white')
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
        p1: new Player('red'),
        p2: new Player('green'),
        p3: new Player('orange')
      };
      const game = new Game();
      sinon.replace(game, 'players', players);
      assert.isFalse(game.start());
    });
  });

  describe('hasStarted', () => {
    it('should return true when the game has started', () => {
      const players = {
        p1: new Player('red'),
        p2: new Player('green'),
        p3: new Player('orange'),
        p4: new Player('white')
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
        p1: new Player('p1'),
        p2: new Player('p2'),
        p3: new Player('p3'),
        p4: new Player('p4')
      };
      players['p1'].settlements.push('efo');
      players['p3'].settlements.push('bcn');
      players['p4'].settlements.push('klr');

      const game = new Game();
      sinon.replace(game, 'players', players);
      assert.isTrue(game.resourceProduction(5));
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

    it('should not produce resources when numToken is undefined', () => {
      const game = new Game();
      assert.isFalse(game.resourceProduction());
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
        p1: new Player('p1'),
        p2: new Player('p2'),
        p3: new Player('p3'),
        p4: new Player('p4')
      };
      players['p2'].resources = { deduct: sinon.stub().returns(true) };
      sinon.replace(game, 'players', players);
      assert.isTrue(game.buildSettlement('kl', 'p2'));
    });
  });

  it('should build a settlement and return true when cards are deducted', () => {
    const game = new Game();
    const players = {
      p1: new Player('p1'),
      p2: new Player('p2'),
      p3: new Player('p3'),
      p4: new Player('p4')
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
          victoryPoints: 0
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
          victoryPoints: 0
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
          victoryPoints: 0
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
        victoryPoints: 0
      }
    };
    assert.deepStrictEqual(game.status('2'), expected);
  });
});
