express = require('express'); // Express Framework
app =  express(); // Initialize Express App

// App Packages
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

// Template Engine and Default Layouts
app.set('views', __dirname + "/views");
app.engine('handlebars', exphbs(
  {
    defaultLayout: 'main'
  }
));
app.set('view engine', 'handlebars');

// Pathing and Parsers
app.use('/assets', express.static(__dirname + '/views/assets'));
app.use('/public', express.static(__dirname + '/views/static'));
app.use(bodyParser.json());

// App Modules
var Server = require('./server.js');
var Routes = require('./routes.js');
Server.startServer(); // Start Web App
