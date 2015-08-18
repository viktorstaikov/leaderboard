var Division = function (rank) {
    this.rank = rank;
    this.players = [];
}

Division.prototype.addPlayer = function (player) {
    this.players.push(player);
};

Division.prototype.removePlayer = function (player) {
    //to be implemented...
};

module.exports = Division;