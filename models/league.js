var Division = require('./division')

var League = function (id, capacity, divisionsCount, divisionsCap) {
    this.id = id;
    this.capacity = capacity;
    this.count = 0;

    this.divisions = [];
    for (var i = 0; i < divisionsCount; i++) {
        this.divisions.push(new Division(i));
    };
    this.divisionsCap = divisionsCap;

    this._divisionToFill = 0;
    this._fillLastDivisionOnly = false;
}

League.prototype.addPlayer = function (player) {
    player.league = this.id;

    if (this.divisions[this._divisionToFill].count < this.divisionsCap) {
        this.divisions[this._divisionToFill].addPlayer(player);

        this.count++;
        if (this._fillLastDivisionOnly == false) {
            this._divisionToFill++;
            if (this._divisionToFill >= this.divisions.length) {
                this._divisionToFill = 0;
            }
        }
    } else if (this.capacity == Infinity) {
        this.divisions.push(new Division(this.divisions.length));
        this._divisionToFill = this.divisions.length - 1;

        this.divisions[this._divisionToFill].addPlayer(player);

        this.count++;
        this._fillLastDivisionOnly = true;
    } else {
        throw JSON.stringify(player) + 'failed to be added';
    }

    return player;
};

module.exports = League;