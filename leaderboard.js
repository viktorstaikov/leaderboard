var League = require('./models/league');

var Leaderboard = function (config, players) {
    this.info = this._adjustSettings(config);

    this.players = players;

    this.board = {};
    this.buildBoard();
}

Leaderboard.prototype.buildBoard = function () {
    this.players = this.players.sort(function (a, b) {
        return Object.compare(b.rating, a.rating);
    });

    this.board.leagues = [];

    var leagueIndex;
    var k, addedPlayers = 0;
    var capacity, divisionsCount
    for (leagueIndex = 0; leagueIndex < this.info.leagues.length; leagueIndex++) {
        if (leagueIndex != this.info.leagues.length - 1) {
            capacity = this.info.leagues[leagueIndex].capacity;
            divisionsCount = Math.round(capacity / this.info.divisions.size);

            this.board.leagues.push(new League(leagueIndex, capacity, divisionsCount));
            for (k = 0; k < capacity; k++) {
                this.board.leagues[leagueIndex].addPlayer(this.players[addedPlayers + k]);
            }
        } else {
            capacity = Infinity;
            divisionsCount = Math.round((this.players.length - addedPlayers) / this.info.divisions.size);
            this.board.leagues.push(new League(leagueIndex, capacity, divisionsCount));

            for (k = addedPlayers; k < this.players.length; k++) {
                this.board.leagues[leagueIndex].addPlayer(this.players[k]);
            }
        }

        addedPlayers = addedPlayers + k;
    };

};

Leaderboard.prototype._adjustSettings = function (config) {
    //more fine checks and adjustments should be made here
    var opt = {};
    var defaultConfig = {
        leagues: {
            count: 8,
            population: .125
        },
        divisions: {
            size: 50
        }
    }

    if (config == null || config.leagues == null || config.divisions == null) {
        return defaultConfig;
    }
    return config;
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

Leaderboard.prototype.getDivisionStanding = function (first_argument) {
    // body...
};

Leaderboard.prototype.addPlayer = function (player) {
    this.board.leagues[this.info.leagues.length - 1].addPlayer(player);
};

module.exports = Leaderboard;