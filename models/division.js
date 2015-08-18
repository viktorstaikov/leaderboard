var Division = function (rank) {
    this.rank = rank;
    this.players = [];
}

Division.prototype.addPlayer = function (player) {
    this.players.push(player);
};

Division.prototype.removePlayer = function (player) {
    //to be implemented...
    throw 'not implemented, yet...'
};

Division.prototype.getStanding = function () {
    return this.players.sort(function (a, b) {
        return b.points - a.points;
    })
};

module.exports = Division;