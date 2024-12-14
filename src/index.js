//index.js

import "./styles.css";

const { Ship } = require('./ship.js');
const { GameBoard } = require('./gameboard.js');
const { Player } = require('./player.js');
const { ComputerPlayer } = require('./com.js');
const { renderBoard } = require('./playerRender.js');

renderBoard('game-board1');
renderBoard('game-board2');