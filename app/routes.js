(function() {
    var fs = require('fs');
    var opts = {
      root: __dirname + '/views/www/'
    }
    app.get('/', function(req, res) {
      res.sendFile('index.html', opts);
    });
})();
