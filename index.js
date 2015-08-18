var Leaderboard = require('./leaderboard')
var sampleData = require('./sampledata')
var config = require('./config')

var lb = new Leaderboard(config, sampleData);

console.log(lb.get())