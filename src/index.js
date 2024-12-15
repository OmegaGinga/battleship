//index.js

import "./styles.css";

const { Ship } = require('./ship.js');
const { GameBoard } = require('./gameboard.js');
const { Player } = require('./player.js');
const { renderBoard } = require('./boardRenderer.js');

const player1 = Player();
renderBoard(player1);