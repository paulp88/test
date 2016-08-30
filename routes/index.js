var express = require('express');
var router = express.Router();
var games = require('../services/games');

/* GET home page. */
router.get('/', function(req, res, next) {
  var visits = parseInt(req.cookies.visits) || 0;
  var name = req.cookies.NameP || "Paul";
  var userId=req.agent.id;
  
  visits += 1;
  res.cookie('visits', visits);
  res.cookie('NameP', name);
  res.render('index',
            { title: 'Hangman', 
              name: 'World', 
              visits: visits,
              myName: name,
              userIdN: userId,
              createdGames: games.createdBy(userId),
              availableGames: games.availableTo(userId)
            }
            );
});

module.exports = router;
