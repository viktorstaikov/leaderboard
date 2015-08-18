var uuid = require('node-uuid');

var Player = function (obj) {
    obj = obj || {};

    this.id = obj.id || uuid.v4();
    this.rating = obj.rating || 0;
    this.points = obj.points || 0;
    this.league = obj.league || -1;
    this.division = obj.division || -1;
    this.rank = obj.rank || -1; // division rank
};

module.exports = Player;