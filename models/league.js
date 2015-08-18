var Division = require('./division')

var League = function (rank, capacity, divisionsCount) {
    this.rank = rank;
    this.capacity = capacity;
    this.count = 0;

    this.divisions = new Array(divisionsCount);
    for (var i = this.divisions.length - 1; i >= 0; i--) {
        this.divisions[i] = new Division(i)
    };

    this._divisionToFill = 0;
}

League.prototype.addPlayer = function (player) {
    player.league = this.rank;

    this.divisions[this._divisionToFill].addPlayer(player);

    player.division = this._divisionToFill;
    this.count++;

    this._divisionToFill = (this._divisionToFill + 1) % this.divisions.length;
};

module.exports = League;