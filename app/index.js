express = require('express');
app =  express();
app.use('/assets', express.static(__dirname + '/views/assets'));
app.use('/public', express.static(__dirname + '/views/static'));
var Server = require('./server.js');
var Routes = require('./routes.js');
Server.startServer();
