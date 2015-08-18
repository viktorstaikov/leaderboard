var League = require('./models/league');

var Leaderboard = function (config, players) {
    this.config = config;

    this.players = players;

    this.board = {};
    this.buildBoard();
}

Leaderboard.prototype.buildBoard = function () {
    this.players = this.players.sort(function (a, b) {
        return b.rating - a.rating;
    });

    this.board.leagues = [];

    var leagueIndex;
    var k, addedPlayers = 0;
    var capacity, divisionsCount
    for (leagueIndex = 0; leagueIndex < this.config.leagues.length; leagueIndex++) {
        if (leagueIndex != this.config.leagues.length - 1) {
            capacity = this.config.leagues[leagueIndex].capacity;
            if (0 < capacity && capacity < 1) {
                capacity = Math.round(capacity * this.players.length);
            }
            divisionsCount = Math.round(capacity / this.config.divisions.size);

            this.board.leagues.push(new League(leagueIndex, capacity, divisionsCount));
            for (k = 0; k < capacity; k++) {
                this.board.leagues[leagueIndex].addPlayer(this.players[addedPlayers + k]);
            }
        } else {
            capacity = Infinity;
            divisionsCount = Math.round((this.players.length - addedPlayers) / this.config.divisions.size);
            this.board.leagues.push(new League(leagueIndex, capacity, divisionsCount));

            for (k = addedPlayers; k < this.players.length; k++) {
                this.board.leagues[leagueIndex].addPlayer(this.players[k]);
            }
        }

        addedPlayers = addedPlayers + k;
    };

};

Leaderboard.prototype.get = function() {
    // return this.players;
    return JSON.stringify(this.board);
};

Leaderboard.prototype.handlePlayerUpdate = function (first_argument) {
    // body...
};

Leaderboard.prototype.getPlayerRank = function (playerId) {
    // body...
};

Leaderboard.prototype.getDivisionStanding = function (league, division) {
    return this.board.leagues[league].divisions[division].getStanding();
};

Leaderboard.prototype.addPlayer = function (player) {
    this.board.leagues[this.config.leagues.length - 1].addPlayer(player);
};

module.exports = Leaderboard;