express = require('express');
app =  express();
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

app.set('views', __dirname + "/views");
app.engine('handlebars', exphbs(
  {
    defaultLayout: 'main'
  }
));
app.set('view engine', 'handlebars');
app.use('/assets', express.static(__dirname + '/views/assets'));
app.use('/public', express.static(__dirname + '/views/static'));
app.use(bodyParser.json());
var Server = require('./server.js');
var Routes = require('./routes.js');
Server.startServer();
