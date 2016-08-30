var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var visits = parseInt(req.cookies.visits) || 0;
  var name = req.cookies.NameP || "Paul";
  visits += 1;
  res.cookie('visits', visits);
  res.cookie('NameP', name);
  res.render('index',
            { title: 'Express', 
              name: 'World', 
              visits: visits,
              myName: name 
            }
            );
});

module.exports = router;
