function renderBoard(player, boardId, otherPlayer) {
    const isComputer = player.isComputer;

    let playerBoard;
    let otherPlayerBoard;

    if (isComputer) {
        playerBoard = player.getComputerBoard();
        otherPlayerBoard = otherPlayer.getPlayerBoard();
    } else if (otherPlayer.isComputer) {
        playerBoard = player.getPlayerBoard();
        otherPlayerBoard = otherPlayer.getComputerBoard();
    } else {
        playerBoard = player.getPlayerBoard();
        otherPlayerBoard = otherPlayer.getPlayerBoard();
    }

    
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
    const shipsName = ['Carrier', 'Battleship', 'Cruiser', 'Submarine'];
    const newButtonDiv = document.createElement('div');
    const toggleButton = document.createElement('button');
    const fleetDiv = document.createElement('div');
    const heading = document.createElement('h2');
    const innerDiv = document.createElement('div');
    const shipInterface = document.querySelector('.ship-interface');
    const temporalContainer = document.querySelector('.temporal-container');

    fleetDiv.setAttribute('id', boardId);
    fleetDiv.classList.add(`fleet-${boardId}`);
    innerDiv.classList.add('fleet-content');

    shipsContainer.classList.add('ships-container');
    shipsContainer.setAttribute('id', `${boardId}-ships-container`);
    shipsContainer1.classList.add('ships-container1');
    shipsContainer2.classList.add('ships-container2');
    shipsContainer3.classList.add('ships-container3');
    shipsContainer4.classList.add('ships-container4');
    board.classList.add('board');
    board.setAttribute('id', boardId);
    toggleButton.textContent = 'Toggle Ships Visibility';

    if (!isComputer){
        toggleButtonContainer.appendChild(newButtonDiv);
    }

    newButtonDiv.appendChild(toggleButton);
    heading.textContent = 'FLEET';
    temporalContainer.textContent = 'Please drag all the ships to your board to start.';

    gameBoard.appendChild(board);
    
    
    if(!isComputer){
        shipsPlaceContainer.appendChild(shipsContainer);
        shipsContainer.appendChild(shipsContainer1);
        shipsContainer.appendChild(shipsContainer2);
        shipsContainer.appendChild(shipsContainer3);
        shipsContainer.appendChild(shipsContainer4);
    }

    fleetDiv.appendChild(heading);
    fleetDiv.appendChild(innerDiv);
    shipInterface.appendChild(fleetDiv);
    

    playerBoard.nodes.forEach((node) => {
        const cell = document.createElement('div');
        
        cell.classList.add(`pos_${node.x}_${node.y}`, 'cell', 'click-pointer', 'drop-zone', `${boardId}-cell`);
        board.appendChild(cell);

        cell.addEventListener('click', function handleClick() {
            console.log(otherPlayerBoard.availableShipsLeft());
            console.log(playerBoard.availableShipsLeft());

            if(!player.isPlayerReady()){
                console.log('Player is not ready yet!');
                return;
            }

            const result = player.receiveAttack(node.x, node.y);
    
            if (result === 'Hit' || result === 'Sunk') {
                cell.classList.remove('white');
                cell.classList.remove('hidden');
                cell.classList.add('hit'); 
            } if (result === 'Sunk') {
                const fleetContent = document.querySelector(`.fleet-${boardId} .fleet-content`);
                const fleet = fleetContent.children;
                const shipLength = node.ship.length;

                console.log(result);
                console.log(fleetContent);
                console.log(fleet);

                for (const ship of fleet) {
                    console.log(ship.textContent);
                    if (shipsName[shipLength -1] === ship.textContent.trim()) {
                        ship.remove();
                        break;
                    }
                }
                
            }  else if (result === 'Missed') {
                cell.classList.add('missed');
                cell.textContent = 'X';
            }
    
            cell.removeEventListener('click', handleClick);
            cell.style.pointerEvents = 'none';

            if (isComputer && otherPlayer.isPlayerReady()) {
                const { result, x, y} = player.computerAttack(otherPlayer);
                const contraryCell = document.querySelector(`.pos_${x}_${y}.player1-board-cell`);
                const contraryNodes = otherPlayerBoard.nodes;
                const node = contraryNodes.find(node => node.x === x && node.y === y);
                
                if (result === 'Hit' || result === 'Sunk') {
                    contraryCell.classList.remove('white');
                    contraryCell.classList.remove('hidden');
                    contraryCell.classList.add('hit');    
                                
                } 
                if (result === 'Sunk'){
                    const fleetContent = document.querySelector(`.fleet-player1-board .fleet-content`);
                    const fleet = fleetContent.children;
                    const shipLength = node.ship.length;

                    console.log(result);
                    console.log(fleetContent);
                    console.log(fleet);

                    for (const ship of fleet) {
                        console.log(ship.textContent);
                        if (shipsName[shipLength -1] === ship.textContent.trim()) {
                            ship.remove();
                            break;
                        }
                    }

                } else if (result === 'Missed') {
                    contraryCell.classList.add('missed');
                    contraryCell.textContent = 'X';
                }
            }

            if (!otherPlayerBoard.availableShipsLeft()) {
                player.playerWin();
            } else if (!playerBoard.availableShipsLeft()) {
                otherPlayer.playerWin();
            }
        });

        cell.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        cell.addEventListener('drop', (event) => {
            event.preventDefault();

            const targetBoardId = board.getAttribute('id');
            const shipBoardId = event.dataTransfer.getData('boardId');

            if (targetBoardId !== shipBoardId) {
                temporalContainer.textContent = 'HAHAHA! I knew you would do that.';
                return;
            }
        
            const shipLength = parseInt(event.dataTransfer.getData('text/plain'), 10);
            const direction = event.dataTransfer.getData('direction');
            const shipId = event.dataTransfer.getData('shipId');
        
            if (playerBoard.placeShip(node.x, node.y, shipLength, direction)) {
                if (direction === 'vertical') {
                    for (let i = 0; i < shipLength; i++) {
                        const cellPosition = board.querySelector(`.pos_${node.x + i}_${node.y}`);
                        if (cellPosition) {
                            cellPosition.classList.add('white')                            
                        };
                    }
                } else if (direction === 'horizontal') {
                    for (let i = 0; i < shipLength; i++) {
                        const cellPosition = board.querySelector(`.pos_${node.x}_${node.y + i}`);
                        if (cellPosition) {
                            cellPosition.classList.add('white');
                        };
                    }
                }

                if (!isComputer) {
                    const shipDiv = document.getElementById(shipId);
                    const playerShipsContainer = document.querySelector(`#${boardId}-ships-container`);
                
                    if (playerShipsContainer) { 
                        const shipContainers = playerShipsContainer.children;
                
                        if (playerShipsContainer.contains(shipDiv)) {
                            shipDiv.remove();
                        }
                
                        const allAreEmpty = [...shipContainers].every(container => container.children.length === 0);
                
                        if (allAreEmpty) {
                            temporalContainer.textContent = 'Game started!';
                            const allCells = document.querySelector(`.board#${boardId}`);
                            const cells = allCells.children;

                            for (const cell of cells) {
                                if(cell.classList.contains('white')){
                                    cell.classList.remove('white');
                                }
                                if(cell.classList.contains('hidden')){
                                    cell.classList.remove('hidden');
                                }
                            }

                            player.playerIsReady();

                            if(otherPlayer.isComputer){
                                otherPlayer.playerIsReady();
                            }
                            console.log('Player is ready!');
                            playerShipsContainer.remove();
                        }
                
                        updateShips(shipLength);
                    }
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

    let isHidden = false;

    toggleButton.addEventListener('click', () => {
        const boardCells = document.querySelectorAll('.board .cell');
        
        boardCells.forEach((cell) => {
            if (cell.classList.contains('white') && cell.classList.contains(`${boardId}-cell`)) {
                if (isHidden) {
                    cell.classList.remove('hidden');
                } else {
                    cell.classList.add('hidden');
                }
            }
        });

        isHidden = !isHidden;
    });

    if(isComputer){
        ships.forEach(ship => {
            updateShips(ship);
        })
    }

    function updateShips(shipLength){
        const fleetContent = document.querySelector(`.fleet-${boardId} .fleet-content`);
        const newP = document.createElement('p');
        newP.classList.add(`${boardId}-${ships[shipLength-1]}`)
        newP.textContent = shipsName[shipLength-1];
        fleetContent.appendChild(newP);
    }

};

module.exports = {
    renderBoard,
}
