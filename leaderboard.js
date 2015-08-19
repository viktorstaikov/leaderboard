var League = require('./models/league');

var Leaderboard = function (config, players) {
    this.config = config;

    this.players = players;
    this.playersById = {};

    this.leagues = []

    this.buildBoard();
}

Leaderboard.prototype._getDivisionByPlayer = function (id) {
    var l = this.playersById[id].league;
    var d = this.playersById[id].division;

    return this.leagues[l].divisions[d];
};

Leaderboard.prototype.buildBoard = function () {
    this.players = this.players.sort(function (a, b) {
        return b.rating - a.rating;
    });


    var leagueIndex;
    var k, addedPlayers = 0;
    var capacity, divisionsCount;
    for (leagueIndex = 0; leagueIndex < this.config.leagues.length; leagueIndex++) {
        if (leagueIndex != this.config.leagues.length - 1) {
            capacity = this.config.leagues[leagueIndex].capacity;
            if (0 < capacity && capacity < 1) {
                capacity = Math.round(capacity * this.players.length);
            }
            divisionsCount = Math.round(capacity / this.config.divisions.size);
        } else {
            capacity = Infinity;
            divisionsCount = Math.round((this.players.length - addedPlayers) / this.config.divisions.size);
        }

        this.leagues.push(new League(leagueIndex, capacity, divisionsCount, this.config.divisions.size));
        var playersToAdd = Math.min(capacity, this.players.length - addedPlayers);
        for (k = 0; k < playersToAdd; k++) {
            this.leagues[leagueIndex].addPlayer(this.players[addedPlayers + k]);
        }

        addedPlayers = addedPlayers + k;
    };
    this.playersById = this.players.reduce(function (total, current) {
        total[current.id] = current;
        return total;
    }, {});
};

Leaderboard.prototype.addPlayer = function (player) {
    var r = this.leagues[this.config.leagues.length - 1].addPlayer(player);
    this.players.push(player);
    this.playersById[player.id] = player;

    return r;
};

Leaderboard.prototype.removePlayer = function (id) {
    var div = this._getDivisionByPlayer(id);
    div.removePlayer(id);
};

Leaderboard.prototype.updatePlayer = function (id, rating, points) {
    var div = this._getDivisionByPlayer(id);
    return div.updatePlayer(id, rating, points);
};

Leaderboard.prototype.getPlayer = function (id) {
    var div = this._getDivisionByPlayer(id);
    return div.getPlayer(id);
};

Leaderboard.prototype.getDivisionStanding = function (league, division, count) {
    return this.leagues[league].divisions[division].getStanding(count);
};

Leaderboard.prototype.getMetadata = function () {
    var meta = {
        leagues: []
    };
    for (var i = 0; i < this.leagues.length; i++) {
        meta.leagues.push({});
        meta.leagues[i].id = this.leagues[i].id;
        meta.leagues[i].capacity = this.leagues[i].capacity;
        meta.leagues[i].players = this.leagues[i].count;
        meta.leagues[i].divisionsCap = this.leagues[i].divisionsCap;

        meta.leagues[i].divisions = [];
        for (var j = 0; j < this.leagues[i].divisions.length; j++) {
            meta.leagues[i].divisions.push({});
            meta.leagues[i].divisions[j].id = this.leagues[i].divisions[j].id;
            meta.leagues[i].divisions[j].players = this.leagues[i].divisions[j].players.length;
        };
    };
    return meta;
}

module.exports = Leaderboard;