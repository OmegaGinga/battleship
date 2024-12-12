// test.js
const { Ship } = require('./ship.js');

test('Is sunk', () => {
    const ship = Ship(2); // Provide a length for the ship.
    expect(ship.isSunk()).toBe(false); // Initially not sunk.
    ship.hit();
    expect(ship.isSunk()).toBe(false); // Not sunk after 1 hit.
    ship.hit();
    expect(ship.isSunk()).toBe(true); // Sunk after 2 hits.
});

test('Ship with length 1 sinks after one hit', () => {
    const ship = Ship(1);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

test('Ship with length 100 does not sink after 99 hits', () => {
    const ship = Ship(100);
    for (let i = 0; i < 99; i++) {
        ship.hit();
    }
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});