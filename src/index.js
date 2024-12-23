import "./styles.css";

const { Ship } = require('./ship.js');
const { GameBoard } = require('./gameboard.js');
const { Player } = require('./player.js');
const { ComputerPlayer } = require('./com.js');
const { renderBoard } = require('./boardRenderer.js');

const audio = document.querySelector('audio');

let player1Name = '';
let player2Name = '';

function assignNames() {

    return new Promise((resolve) => {
        const temporalContainer = document.querySelector('.temporal-container');
        const title = document.createElement('h1');
        const input = document.createElement('input');
        const submitButton = document.createElement('button');

        title.textContent = 'Enter your name';
        submitButton.textContent = 'Submit';

        temporalContainer.appendChild(title);
        temporalContainer.appendChild(input);
        temporalContainer.appendChild(submitButton);

        submitButton.addEventListener('click', () => {
            let name = input.value;
            const wrongName = document.querySelector('.error-handler') || document.createElement('p');
            wrongName.classList.add('error-handler');
    
            if (name === '') {
                wrongName.textContent = 'Name field must have a letter at least';
                temporalContainer.appendChild(wrongName);
                return;
            }
    
            const player1NameContainer = document.querySelector('.player1-name .name');
            wrongName.textContent = '';
            player1NameContainer.textContent = name;
            player1Name = name;
            
            title.innerHTML = 'Who you will play against?';
            input.style.display = 'none';
            submitButton.remove();
    
            const choiceHuman = document.createElement('button');
            const choiceComputer = document.createElement('button');
    
            choiceHuman.textContent = 'Human';
            choiceComputer.textContent = 'Computer';
    
            temporalContainer.appendChild(choiceHuman);
            temporalContainer.appendChild(choiceComputer);
    
            choiceHuman.addEventListener('click', () => {
                title.textContent = 'Enter your name';
                const submitButton2 = document.createElement('button');
                input.style.display = 'block';
                submitButton2.textContent = 'Submit';
                
                temporalContainer.appendChild(submitButton2);
                choiceHuman.remove();
                choiceComputer.remove();
    
                submitButton2.addEventListener('click', () => {
                    name = input.value;
                    if (name === '') {
                        wrongName.textContent = 'Name field must have a letter at least';
                        temporalContainer.appendChild(wrongName);
                        return;
                    }
                    const player2NameContainer = document.querySelector('.player2-name .name');
                    wrongName.textContent = '';
                    player2NameContainer.textContent = name;
                    player2Name = name;
    
                    temporalContainer.innerHTML = '';
                    resolve();
                });
            });
    
            choiceComputer.addEventListener('click', () => {
                const computerNames = ["AI_Bot_3000", "Robo_Warrior", "Mega_AI", 'Terminator_69', 'Gatita_69', 'Maquina de fuego'];
                player2Name = computerNames[Math.floor(Math.random() * computerNames.length)];
                const player2NameContainer = document.querySelector('.player2-name .name');
                player2NameContainer.textContent = player2Name;
    
                temporalContainer.innerHTML = '';
                resolve();
            });
        });
    });
}

async function generatePlayers() {
    await assignNames();
    const player1 = Player(player1Name);

    let player2;

    if (isComputer(player2Name)) {
        player2 = ComputerPlayer(player2Name);
    } else {
        player2 = Player(player2Name);
    }

    renderBoard(player1, 'player1-board', player2);
    renderBoard(player2, 'player2-board', player1);
    audio.loop = true;
    audio.play();    
}

function isComputer(name) {
    const computerNames = ["AI_Bot_3000", "Robo_Warrior", "Mega_AI", 'Terminator_69', 'Gatita_69', 'Maquina de fuego'];
    return computerNames.includes(name);
}

generatePlayers();
