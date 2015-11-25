(function() {
    var fs = require('fs');

    app.get('/', function(req, res) {
      fs.readdir(__dirname + '/views/data', function(err, data) {
        if(err) {
          res.status(500).json({
            'message': 'Could not read directory',
            'err': err
          });
        }

        if(data) {
          var json = {
            files: data
          };
          res.render('index', json);
        }
      });
    });

    app.get('/models/read/:model', function(req, res) {
      var file = req.params.model;
      var basePath = __dirname + '/views/data/';
      fs.readFile(basePath + file, 'utf8', function(err, data) {
        if(err) {
          res.status(500).json({
            'message': 'Could not read model',
            'err': err
          });
        }

        if(data) {
          var json = JSON.parse(data);
          res.status(200).json(json);
        }
      })
    });

    app.get('/build', function(req, res) {
      res.render('createModel');
    });

    app.post('/build/write', function(req, res) {
      var json = req.body;
      var fileData = JSON.stringify(json.data);
      var path = __dirname + "/views/data/" + json.fileName;
      fs.writeFile(path, fileData, 'utf8', function(err) {
        if(err) {
          res.status(500),json(err);
        } else {
          res.sendStatus(200);
        }
      });
    });
})();
