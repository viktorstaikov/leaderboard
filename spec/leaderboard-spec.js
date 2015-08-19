var randgen = require('randgen');
var Leaderboard = require('../index');
var Player = require('../models/player');

var samplePlayers = require('./sampledata');
var config = require('./config');

describe('Leaderboard', function () {
    var leaderboard;

    beforeEach(function () {
        leaderboard = new Leaderboard(config, samplePlayers);
    });

    it('Config is applied properly', function () {
        var meta = leaderboard.getMetadata();

        for (var i = 0; i < config.leagues.length - 1; i++) {
            var cl = config.leagues[i];
            var ll = meta.leagues[i];
            var cap = 0
            expect(ll).not.toBeNull();

            if (cl.capacity > 1) {
                cap = cl.capacity;
            } else {
                cap = Math.round(cl.capacity * samplePlayers.length);
            }
            expect(ll.capacity).toEqual(cap);
            expect(ll.divisions.length).toEqual(cap / config.divisions.size);
        }
        expect(leaderboard.leagues[i].capacity).toEqual(Infinity);
        // not yet decided
        // expect(meta.leagues[i].divisions.length).toEqual(cap / config.divisions.size);
    });

    it('Get player stats', function () {
        var index = Math.round(Math.random() * samplePlayers.length);
        var player = samplePlayers[index];
        var result = leaderboard.getPlayer(player.id);

        expect(result).not.toBeNull();
        expect(result.id).toEqual(player.id);
        expect(result.rating).not.toBeNull();
        expect(result.points).not.toBeNull();
        expect(result.rank).not.toBeNull();
    });

    it('Add new player', function () {
        var p = new Player();
        var result = leaderboard.addPlayer(p);

        expect(result.league).not.toEqual(-1);
        expect(result.division).not.toEqual(-1);
        // expect(result.rank).not.toEqual(Infinity);
    });

    it('Update player stats', function () {
        var rating = randgen.rnorm(25, 8.33);
        var points = Math.round(Math.random() * 10);
        var index = Math.round(Math.random() * samplePlayers.length);
        var p = samplePlayers[index];
        var newRating = p.rating + rating;
        var newPoints = p.points + points;

        var r = leaderboard.updatePlayer(p.id, rating, points);

        expect(r.rating).toEqual(newRating);
        expect(r.points).toEqual(newPoints);
    });

    it('Remove player from his division', function () {
        var index = Math.round(Math.random() * samplePlayers.length);
        var p = samplePlayers[index];

        leaderboard.removePlayer(p.id);
        var r = leaderboard.getPlayer(p.id);

        expect(r).toBeNull();
    });

    it('Get standing', function () {
        var standing = leaderboard.getDivisionStanding(0, 0);
        for (var i = 0; i < standing.length - 1; i++) {
            expect(standing[i].points).not.toBeLessThan(standing[i + 1].points);
        };
    });
});