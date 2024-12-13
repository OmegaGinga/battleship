const { node } = require("webpack");
const { Ship } = require('./ship.js');

const Node = (x, y) => {
    return {
        x,
        y,
        ship: false,
        hit: false,
        neighbors: [],
    };
};

const GameBoard = () => {
    const nodes = [];

    function generateBoard(){
        const rows = 10;
        const cols = 10;
    
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                nodes.push(Node(i,j));
            }
        }
    
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                const node = nodes[i * cols + j];
    
                if (i > 0) node.neighbors.push(nodes[(i - 1) * cols + j]);
                if (i < rows - 1) node.neighbors.push(nodes[(i + 1) * cols + j]);
                if (j > 0) node.neighbors.push(nodes[i * cols + (j - 1)]);
                if (j < cols - 1) node.neighbors.push(nodes[i * cols + (j + 1)]);
    
            }
        }
    }

    function placeShip(x, y, length, direction) {
        const ship = Ship(length);
    
        // Check horizontal placement
        if (direction.toLowerCase() === 'horizontal') {
            if (y + length > 10) return false;
            
            // Check if any of the cells are already occupied
            for (let i = 0; i < length; i++) {
                const node = nodes[x * 10 + (y + i)];
                if (node.ship) return false;
            }
    
            // Place the ship on the board
            for (let i = 0; i < length; i++) {
                const node = nodes[x * 10 + (y + i)];
                node.ship = ship;
            }
        } 
        // Check vertical placement
        else if (direction.toLowerCase() === 'vertical') {
            if (x + length > 10) return false;
            
            // Check if any of the cells are already occupied
            for (let i = 0; i < length; i++) {
                const node = nodes[(x + i) * 10 + y];
                if (node.ship) return false;
            }
    
            // Place the ship on the board
            for (let i = 0; i < length; i++) {
                const node = nodes[(x + i) * 10 + y];
                node.ship = ship;
            }
        }
    
        return true;
    }

    
    return {
        generateBoard,
        placeShip,
        nodes,
    }

};

module.exports = {
    Node,
    GameBoard,
}