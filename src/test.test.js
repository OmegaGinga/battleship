// test.js
const { Ship } = require('./ship.js');
const { GameBoard } = require('./gameboard.js');
const { Player } = require('./player.js');
const { ComputerPlayer } = require('./com.js');

test('Is sunk', () => {
    const ship = Ship(2); // Provide a length for the ship.
    expect(ship.isSunk()).toBe(false); // Initially not sunk.
    ship.hit();
    expect(ship.isSunk()).toBe(false); // Not sunk after 1 hit.
    ship.hit();
    expect(ship.isSunk()).toBe(true); // Sunk after 2 hits.
});

test('Ship with length 1 sinks after one hit', () => {
    const ship = Ship(1);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

test('Ship with length 100 does not sink after 99 hits', () => {
    const ship = Ship(100);
    for (let i = 0; i < 99; i++) {
        ship.hit();
    }
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

test('Game board is defined', () => {
    const gameBoard = GameBoard();
    gameBoard.generateBoard(); // Call generateBoard to populate the nodes array
    expect(gameBoard.generateBoard).toBeDefined(); // Check if the function is defined
    expect(gameBoard.nodes.length).toBeGreaterThan(0); // Check if nodes are populated
});

test('Place ship on game board', () => {
    const gameBoard = GameBoard();
    gameBoard.generateBoard();
    expect(gameBoard.placeShip(4,4, 4, 'horizontal')).toBeTruthy();
    expect(gameBoard.placeShip(8,8, 10, 'horizontal')).toBeFalsy();
});

test('Ship is hit', () => {
    const gameBoard = GameBoard();
    gameBoard.generateBoard();
    gameBoard.placeShip(4, 4, 2, 'horizontal');
    gameBoard.placeShip(6, 2, 1, 'horizontal');
    
    expect(gameBoard.receiveAttack(4, 4)).toBe('Hit');

    expect(gameBoard.receiveAttack(4, 4)).toBe('Already hit');

    expect(gameBoard.receiveAttack(4, 5)).toBe('The boat is sunk');      
    
    expect(gameBoard.receiveAttack(4, 4)).toBe('Already hit');

    expect(gameBoard.receiveAttack(6, 4)).toBe('Missed');
});

test('There is ship left?', () => {
    const gameBoard = GameBoard();
    gameBoard.generateBoard();
    gameBoard.placeShip(6, 2, 1, 'horizontal');

    expect(gameBoard.availableShipsLeft()).toBeTruthy();

    gameBoard.receiveAttack(6, 2);

    expect(gameBoard.availableShipsLeft()).toBeFalsy();

    expect(gameBoard.receiveAttack(6, 2)).toBe('Already hit');

});

describe('ComputerPlayer', () => {
    let computerPlayer;

    beforeEach(() => {
        computerPlayer = ComputerPlayer();
    });

    test('should generate a board with no overlapping ships', () => {
        const nodesWithShips = computerPlayer.computerBoard.nodes.filter(node => node.ship);
        const ships = new Set(nodesWithShips.map(node => node.ship));

        ships.forEach(ship => {
            const positions = nodesWithShips.filter(node => node.ship === ship);
            const shipLength = ship.length;

            expect(positions.length).toBe(shipLength);

            const isHorizontal = positions.every((node, i, arr) => {
                return i === 0 || node.y === arr[i - 1].y + 1 && node.x === arr[i - 1].x;
            });

            const isVertical = positions.every((node, i, arr) => {
                return i === 0 || node.x === arr[i - 1].x + 1 && node.y === arr[i - 1].y;
            });

            expect(isHorizontal || isVertical).toBeTruthy();
        });
    });

    test('should successfully attack random positions on the board', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        for (let i = 0; i < 20; i++) {
            computerPlayer.computerAttack();
        }

        const attackedNodes = computerPlayer.computerBoard.nodes.filter(node => node.hit);
        expect(attackedNodes.length).toBeGreaterThan(0);

        const attackedPositions = new Set(attackedNodes.map(node => `${node.x},${node.y}`));
        expect(attackedPositions.size).toBe(attackedNodes.length);

        consoleSpy.mockRestore();
    });

    test('should not attack the same position twice', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        computerPlayer.computerAttack();

        const attackedNodes = computerPlayer.computerBoard.nodes.filter(node => node.hit);
        expect(attackedNodes.length).toBe(1);

        computerPlayer.computerAttack();
        const newAttackedNodes = computerPlayer.computerBoard.nodes.filter(node => node.hit);
        expect(newAttackedNodes.length).toBeGreaterThanOrEqual(attackedNodes.length);

        consoleSpy.mockRestore();
    });

    test('should place all required ships', () => {
        const shipSizes = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
        const nodesWithShips = computerPlayer.computerBoard.nodes.filter(node => node.ship);
        const ships = new Set(nodesWithShips.map(node => node.ship));

        expect(ships.size).toBe(shipSizes.length);

        const shipLengths = Array.from(ships).map(ship => {
            return nodesWithShips.filter(node => node.ship === ship).length;
        });
        shipLengths.sort((a, b) => a - b);
        expect(shipLengths).toEqual(shipSizes.sort((a, b) => a - b));
    });
});
