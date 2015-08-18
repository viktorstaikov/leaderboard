var Player = require('./player');

var Division = function (id) {
    this.id = id;
    this.players = [];
}

Division.prototype.addPlayer = function (player) {
    this.players.push(player);
};

Division.prototype.removePlayer = function (player) {
    //to be implemented...
    throw 'not implemented, yet...'
};

Division.prototype.getPlayer = function (id) {
    this.getStanding();

    for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].id == id) {
            this.players[i].rank = i;
            return this.players[i];
        }
    };
    return null;
};

Division.prototype.getStanding = function () {
    this.players = this.players.sort(function (a, b) {
        return b.points - a.points;
    });
    return this.players;
};

module.exports = Division;