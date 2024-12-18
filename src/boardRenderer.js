function renderBoard(player, boardId) {
    const playerBoard = player.getPlayerBoard();
    const gameBoard = document.querySelector('.game-board');
    const toggleButtonContainer = document.querySelector('.toggle-button-container');
    const board = document.createElement('div');
    const shipsPlaceContainer = document.querySelector('.ship-place-container');
    const shipsContainer = document.createElement('div');
    const shipsContainer1 = document.createElement('div');
    const shipsContainer2 = document.createElement('div');
    const shipsContainer3 = document.createElement('div');
    const shipsContainer4 = document.createElement('div');
    const ships = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
    const newButtonDiv = document.createElement('div');
    const toggleButton = document.createElement('button');

    shipsContainer.classList.add('ships-container');
    shipsContainer.setAttribute('id', `${boardId}-ships-container`);
    shipsContainer1.classList.add('ships-container1');
    shipsContainer2.classList.add('ships-container2');
    shipsContainer3.classList.add('ships-container3');
    shipsContainer4.classList.add('ships-container4');
    board.classList.add('board');
    board.setAttribute('id', boardId);
    toggleButton.textContent = 'Toggle Ships Visibility';
    toggleButtonContainer.appendChild(newButtonDiv);
    newButtonDiv.appendChild(toggleButton);

    gameBoard.appendChild(board);
    
    
    
    shipsPlaceContainer.appendChild(shipsContainer);
    shipsContainer.appendChild(shipsContainer1);
    shipsContainer.appendChild(shipsContainer2);
    shipsContainer.appendChild(shipsContainer3);
    shipsContainer.appendChild(shipsContainer4);

    playerBoard.nodes.forEach((node) => {
        const cell = document.createElement('div');
        
        cell.classList.add(`pos_${node.x}_${node.y}`, 'cell', 'click-pointer', 'drop-zone', `${boardId}-cell`);
        board.appendChild(cell);

        cell.addEventListener('click', function handleClick() {
            if(!player.isPlayerReady()){
                console.log('Player is not ready yet!');
                return;
            }

            const result = player.receiveAttack(node.x, node.y);
    
            if (result === 'Hit' || result === 'Sunk') {
                cell.classList.remove('white');
                cell.classList.add('hit');
            } else if (result === 'Missed') {
                cell.classList.add('missed');
                cell.textContent = 'X';
            }
    
            cell.removeEventListener('click', handleClick);
            cell.style.pointerEvents = 'none';
        });

        cell.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        cell.addEventListener('drop', (event) => {
            event.preventDefault();

            const targetBoardId = board.getAttribute('id');
            const shipBoardId = event.dataTransfer.getData('boardId');

            if (targetBoardId !== shipBoardId) {
                return;
            }
        
            const shipLength = parseInt(event.dataTransfer.getData('text/plain'), 10);
            const direction = event.dataTransfer.getData('direction');
            const shipId = event.dataTransfer.getData('shipId');
        
            if (playerBoard.placeShip(node.x, node.y, shipLength, direction)) {
                if (direction === 'vertical') {
                    for (let i = 0; i < shipLength; i++) {
                        const cellPosition = board.querySelector(`.pos_${node.x + i}_${node.y}`);
                        if (cellPosition) cellPosition.classList.add('white');
                    }
                } else if (direction === 'horizontal') {
                    for (let i = 0; i < shipLength; i++) {
                        const cellPosition = board.querySelector(`.pos_${node.x}_${node.y + i}`);
                        if (cellPosition) cellPosition.classList.add('white');
                    }
                }
                const shipDiv = document.getElementById(shipId);
                const playerShipsContainer = document.querySelector(`#${boardId}-ships-container`);                
                const shipContainers = playerShipsContainer.children;

                if (playerShipsContainer.contains(shipDiv)) {
                    shipDiv.remove();
                }

                const allAreEmpty = [...shipContainers].every(container => container.children.length === 0);

                if (allAreEmpty) {
                    player.playerIsReady();
                    console.log('Player is ready!');
                }
                
            }
        });
    });

    ships.forEach((shipLength, index) => {
        const shipDiv = document.createElement('div');
        shipDiv.classList.add('shipDiv', 'vertical', `length_${shipLength}`);
        shipDiv.setAttribute('draggable', 'true');
        shipDiv.setAttribute('id', `${boardId}-ship-${index}`);

        for (let i = 0; i < shipLength; i++) {
            const ship = document.createElement('div');
            ship.classList.add('ship', 'draggable');
            shipDiv.appendChild(ship);
        }

        shipDiv.addEventListener('click', () => {
            if (shipDiv.classList.contains('horizontal')) {
                shipDiv.classList.remove('horizontal');
                shipDiv.classList.add('vertical');
            } else {
                shipDiv.classList.remove('vertical');
                shipDiv.classList.add('horizontal');
            }
        });

        shipDiv.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', shipLength);
            event.dataTransfer.setData('boardId', boardId);

            if (shipDiv.classList.contains('vertical')) {
                const direction = 'vertical';
                event.dataTransfer.setData('direction', direction);
                console.log('dragging ship is vertical');
            } else if (shipDiv.classList.contains('horizontal')) {
                const direction = 'horizontal';
                event.dataTransfer.setData('direction', direction);
                console.log('dragging ship is horizontal');
            }
            event.dataTransfer.setData('shipId', shipDiv.id);
        });

        if (shipLength === 1) {
            shipsContainer1.appendChild(shipDiv);
        } else if (shipLength === 2) {
            shipsContainer2.appendChild(shipDiv);
        } else if (shipLength === 3) {
            shipsContainer3.appendChild(shipDiv);
        } else if (shipLength === 4) {
            shipsContainer4.appendChild(shipDiv);
        }
    });

    toggleButton.addEventListener('click', () => {
        const boardCells = document.querySelectorAll('.board .cell');
    
        boardCells.forEach((cell) => {
            if (cell.classList.contains('white') && cell.classList.contains(`${boardId}-cell`)) {
                cell.classList.toggle('hidden');
            }
        });
    });

};

module.exports = {
    renderBoard,
}
