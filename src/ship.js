// ship.js

const Ship = (length) => {
    let timesHit = 0;

    function hit() {
        timesHit += 1;
        console.log('The ship has been hit');
        return isSunk();
    }

    function isSunk() {
        return timesHit === length;
    }

    return {
        hit,
        isSunk,
        length,
    };
};

module.exports = {
    Ship,
}