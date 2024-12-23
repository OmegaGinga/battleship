const { GameBoard } = require('./gameboard.js');

const ComputerPlayer = () => {
    const computerBoard = GameBoard();
    computerBoard.generateBoard();
    const shipSizes = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];

    // Place all ships on the board
    for (let i = 0; i < shipSizes.length; i++) {
        const { x, y, direction } = randomNumberGeneration();

        if (computerBoard.placeShip(x, y, shipSizes[i], direction) === false) {
            i -= 1;
        }
    }

    function randomNumberGeneration() {
        const directions = ['horizontal', 'vertical'];
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const randomDirection = directions[Math.floor(Math.random() * 2)];

        return { x, y, direction: randomDirection };
    };

    const attackedNodes = new Set();

    function computerAttack() {
        while (true) {
            const { x, y } = randomNumberGeneration();

            // Skip if this node has already been attacked
            if (attackedNodes.has(`${x},${y}`)) continue;

            const result = computerBoard.receiveAttack(x, y);
            attackedNodes.add(`${x},${y}`);

            console.log(`Computer attacked (${x}, ${y}) and result: ${result}`);

            if (result !== 'Already hit') break;
        }
    }


    

    return {
        computerBoard,
        computerAttack,
    };
};

module.exports = {
    ComputerPlayer,
};
