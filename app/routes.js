(function() {
    var fs = require('fs');
    var opts = {
      root: __dirname + '/views/www/'
    };
    app.get('/', function(req, res) {

      fs.readFile(__dirname + "/views/data/data.json", 'utf8', function(err, data) {
        if(err) {
          res.status(500).json({
            'message': 'Could not read data file',
            'err': err
          });
        } else {
          var json = JSON.parse(data);
          res.render('index', json);
        }
      });
    });

    app.get('/data', function(req, res) {

      fs.readFile(__dirname + '/views/data/data.json', 'utf8', function(err, data) {
        if(err) {
          res.status(500).json({
            'message': 'Could not read data file',
            'err': err
          });
        }

        if(data) {
          var json = JSON.parse(data);
          res.status(200).json(json);
        }
      });

    });

    app.get('/build', function(req, res) {
      res.render('createModel');
    });
})();
