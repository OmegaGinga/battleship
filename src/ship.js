// ship.js

const Ship = (length) =>{
    let timesHit = 0;

    function hit(){
        timesHit += 1;
        return isSunk();
    }

    function isSunk(){
        let sunk = false;
        if(timesHit === length){
            sunk = true;
        }
        return sunk;
    };

    return{
        hit,
        isSunk,
    }

}

module.exports = {
    Ship,
}