const { Player } = require('./player.js');

function renderBoard(player){
    const playerBoard = player.getPlayerBoard();
    const gameBoard = document.querySelector('.game-board');
    const board = document.createElement('div');
    const shipsPlaceContainer = document.querySelector('.ship-place-container');
    const shipsContainer = document.createElement('div');
    const shipsContainer1 = document.createElement('div');
    const shipsContainer2 = document.createElement('div');
    const shipsContainer3 = document.createElement('div');
    const shipsContainer4 = document.createElement('div');
    const ships = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
    let count = 0;

    shipsContainer.classList.add('ships-container');
    shipsContainer1.classList.add('ships-container1');
    shipsContainer2.classList.add('ships-container2');
    shipsContainer3.classList.add('ships-container3');
    shipsContainer4.classList.add('ships-container4');
    board.classList.add('board');

    gameBoard.appendChild(board);
    shipsPlaceContainer.appendChild(shipsContainer);
    shipsContainer.appendChild(shipsContainer1);
    shipsContainer.appendChild(shipsContainer2);
    shipsContainer.appendChild(shipsContainer3);
    shipsContainer.appendChild(shipsContainer4);

    playerBoard.nodes.forEach((node) => {
        const cell = document.createElement('div');
        
        cell.classList.add(`pos_${node.x}_${node.y}`, 'cell', 'click-pointer', 'drop-zone');
        board.appendChild(cell);
        
        cell.addEventListener('click', function handleClick(){
            const result = player.receiveAttack(node.x, node.y);
    
            if (result === 'Hit') {
                cell.classList.add('hit');
            } else if (result === 'Missed') {
                cell.classList.add('missed');
                cell.textContent = 'X';
            }

            cell.removeEventListener('click', handleClick);
            cell.style.pointerEvents = 'none';
        });

    });

    ships.forEach((shipLength) => {
        const shipDiv = document.createElement('div');
        shipDiv.classList.add('shipDiv', 'vertical', `length_${shipLength}`);
    
        for (let i = 0; i < shipLength; i++) {
            const ship = document.createElement('div');
            ship.classList.add('ship', 'draggable');
            shipDiv.appendChild(ship);
        }

        shipDiv.addEventListener('click', () => {
            if (shipDiv.classList.contains('horizontal')){
                shipDiv.classList.remove('horizontal');
                shipDiv.classList.add('vertical');
            } else {
                shipDiv.classList.remove('vertical');
                shipDiv.classList.add('horizontal');
            }
        })
    
        if(shipLength === 1){
            shipsContainer1.appendChild(shipDiv);
        } else if (shipLength === 2){
            shipsContainer2.appendChild(shipDiv);
        } else if (shipLength === 3){
            shipsContainer3.appendChild(shipDiv);
        } else if (shipLength === 4){
            shipsContainer4.appendChild(shipDiv);
        }
    });


    

};

module.exports = {
    renderBoard,
}