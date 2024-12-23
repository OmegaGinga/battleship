const { GameBoard } = require('./gameboard.js');

const Player = (name, isReady = false) => {
    const playerBoard = GameBoard();
    playerBoard.generateBoard();
    
    let playerName = name;
    let readyStatus = isReady;

    function getName(){
        return playerName;
    };

    function setName(newName) {
        playerName = newName;
    };

    function getPlayerBoard(){
        return playerBoard;
    };

    function playerIsReady(){
        readyStatus = true;
    };

    function isPlayerReady() {
        return readyStatus;
    };

    function getShips() {
        return playerBoard.availableShipsLeft();
    };

    function allShipsSunk() {
        return !playerBoard.availableShipsLeft();
    }

    function receiveAttack(x,y){
        return playerBoard.receiveAttack(x,y);
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
        getName,
        setName,
        getPlayerBoard,
        playerIsReady,
        isPlayerReady,
        getShips,        
        allShipsSunk,
        receiveAttack,
        playerWin,
    }
}

module.exports = {
    Player,
}
