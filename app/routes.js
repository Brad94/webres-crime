(function() {
    var fs = require('fs');
    var opts = {
      root: __dirname + '/views/www/'
    };
    console.log('Routes');
    app.get('/', function(req, res) {
      console.log('Works');
      res.render('index');
    });
})();
