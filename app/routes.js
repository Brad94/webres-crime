(function() {
  // Router Module
    var fs = require('fs'); // Filesystem for reading JSON Models

    app.get('/', function(req, res) {
      // Main Route
      fs.readdir(__dirname + '/views/data', function(err, data) {
        // Read Models Directory to populate available models to drop down on front end
        if(err) {
          // Could not read directory
          res.status(500).json({
            'message': 'Could not read directory',
            'err': err
          });
        }

        if(data) {
          // Render index with directory contents available to template
          var json = {
            files: data
          };
          res.render('index', json);
        }
      });
    });

    app.get('/models/read/:model', function(req, res) {
      // Route which reads a given model as a parameter
      var file = req.params.model;
      var basePath = __dirname + '/views/data/';
      fs.readFile(basePath + file, 'utf8', function(err, data) {
        // Read passed model
        if(err) {
          // Could not be read return 500 JSON
          res.status(500).json({
            'message': 'Could not read model',
            'err': err
          });
        }

        if(data) {
          // Parse file data from String to usable JSON and send as response
          var json = JSON.parse(data);
          res.status(200).json(json);
        }
      })
    });

    app.get('/build', function(req, res) {
      // Render the model builder template
      res.render('createModel');
    });

    app.post('/build/write', function(req, res) {
      // Creates a new JSON model file from posted data
      var json = req.body;
      var fileData = JSON.stringify(json.data);
      var path = __dirname + "/views/data/" + json.fileName;
      fs.writeFile(path, fileData, 'utf8', function(err) {
        // Write file with stringified JSON
        if(err) {
          // Could not write file - 500 JSON error
          res.status(500),json(err);
        } else {
          // File written
          res.sendStatus(200);
        }
      });
    });
})();
