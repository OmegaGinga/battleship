const { GameBoard } = require('./gameboard.js');

const Player = () => {
    const playerBoard = GameBoard();
    playerBoard.generateBoard();
    

    return {
        playerBoard,
    }
}


module.exports = {
    Player,
}