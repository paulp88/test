'use strict';
const express = require('express');
const router = express.Router();
const gamesService = require('../services/games');

router.post('/', function(req, res, next) {
    const word = req.body.word;
    if (word && /^[A-Za-z]{3,}$/.test(word)) 
    {
        gamesService.create(req.agent.id, word);
        res.redirect('/');
    } else {
        res.status(400).send('Word must be at least three characters long and contain only letters');
    }
});

const checkGameExists = function(id, res, callback) {
    const game = gamesService.get(id);
    if (game) 
    {
        callback(game);
    } else 
    {
        res.status(404).send('Non-existent game ID');
    }
}


router.get('/:id', function(req, res, next) {
    checkGameExists(
        req.params.id,
        res,
        game => res.render('games', {length: game.word.length, id: game.id})
        );
});

router.post('/:id/guesses', function(req, res, next) {
    checkGameExists(
        req.params.id,
        res,
        game => {res.send({positions: game.positionsOf(req.body.letter)});}
    );
});

module.exports = router;