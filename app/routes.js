(function() {
    var fs = require('fs');
    var opts = {
      root: __dirname + '/views/www/'
    };
    app.get('/', function(req, res) {

      fs.readFile(__dirname + "/views/data/data.json", 'utf8', function(err, data) {
        if(err) {
          console.log(err)
        } else {
          var json = JSON.parse(data);
          res.render('index', json);
        }
      });


    });
})();
