const { GameBoard } = require('./gameboard.js');

const ComputerPlayer = (name, isReady = false) => {
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

    function computerAttack(otherPlayer) {
        while (true) {
            const { x, y } = randomNumberGeneration();

            // Skip if this node has already been attacked
            if (attackedNodes.has(`${x},${y}`)) continue;

            const result = otherPlayer.receiveAttack(x, y);
            attackedNodes.add(`${x},${y}`);

            console.log(`Computer attacked (${x}, ${y}) and result: ${result}`);

            if (result !== 'Already hit') return { result, x, y };
        }
    }

    function getComputerBoard() {
        return computerBoard;
    };

    function receiveAttack(x,y){
        return computerBoard.receiveAttack(x,y);
    }

    function isPlayerReady(){
        return isReady;
    }

    function playerIsReady(){
        isReady = true;
    }

    function playerWin() {
        const winnerText = document.createElement('div');
        const temporalContainer = document.querySelector('.error-handler');
        const restart = document.createElement('button');

        winnerText.classList.add('winner');
        winnerText.textContent = `${name} is the real winner!`;
        temporalContainer.appendChild(winnerText);
        restart.textContent = 'Restart';
        winnerText.appendChild(restart);

        restart.addEventListener('click', () => {
            location.reload();
        })
    }

    return {
        computerAttack,
        getComputerBoard,
        receiveAttack,
        isPlayerReady,
        playerIsReady,
        playerWin,
        isComputer: true,
    };
};

module.exports = {
    ComputerPlayer,
};
