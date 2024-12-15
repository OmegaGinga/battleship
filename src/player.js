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

    return {
        getName,
        setName,
        getPlayerBoard,
        playerIsReady,
        isPlayerReady,
        getShips,        
        allShipsSunk,
        receiveAttack,
    }
}

module.exports = {
    Player,
}
