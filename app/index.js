express = require('express');
app =  express();
var exphbs  = require('express-handlebars');

app.set('views', __dirname + "/views");
app.engine('handlebars', exphbs(
  {
    defaultLayout: 'main'
  }
));
app.set('view engine', 'handlebars');
app.use('/assets', express.static(__dirname + '/views/assets'));
app.use('/public', express.static(__dirname + '/views/static'));
var Server = require('./server.js');
var Routes = require('./routes.js');
Server.startServer();
