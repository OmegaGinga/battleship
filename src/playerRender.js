const { Ship } = require('./ship.js');
const { GameBoard } = require('./gameboard.js');
const { Player } = require('./player.js');

// Start GUI

// At start everything is clean except the title of the game.

function renderBoard(board){

    
    const player = Player();

    const playerNodes = player.playerBoard.nodes;

    const gameBoard = document.querySelector(`.${board}`);

    let gameFinished = false;

    playerNodes.forEach((node)=>{
        const div = document.createElement('div');
        div.classList.add(`${node.x}-${node.y}`, 'board-grid', 'board-grid-hover');
        gameBoard.appendChild(div);    
        
        div.addEventListener('click',(event) => {
            if(player.playerBoard.availableShipsLeft() === false){
                gameFinished = true;
                event.preventDefault();
            }else{
                const attackStatus = player.playerBoard.receiveAttack(node.x, node.y);
                if (attackStatus === 'Missed') {
                    div.textContent = 'X';                        
                } else if(attackStatus === 'Hit' || attackStatus === 'Sunk'){
                    div.style.background = 'red';
                }

                div.classList.remove('board-grid-hover');
                div.classList.add('board-grid-unhover');
                console.log(attackStatus);
            }        
        })
    });

}

module.exports = {
    renderBoard,
}