var Player = require('./player');

var Division = function (id) {
    this.id = id;
    this.players = [];
    this.count = 0;
}

Division.prototype.addPlayer = function (player) {
    player.division = this.id;
    this.players.push(player);
    this.count++;

    return player;
};

Division.prototype.removePlayer = function (id) {
    for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].id == id) {
            this.players[i].league = this.players[i].division = this.players[i].points = 0;
            this.players.splice(i, 1);

            this.count--;
            break;
        }
    }
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

Division.prototype.updatePlayer = function (id, rating, points) {
    for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].id == id) {
            this.players[i].rating += rating;
            this.players[i].points += points;

            return this.players[i];
        }
    };
};

Division.prototype.getStanding = function (count) {
    this.players = this.players.sort(function (a, b) {
        return b.points - a.points;
    });

    if (count > 1) {
        return this.players.slice(0, count);
    }
    return this.players;

};

module.exports = Division;