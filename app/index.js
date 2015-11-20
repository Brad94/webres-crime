express = require('express');
app =  express();
var Server = require('./server.js');
var Routes = require('./routes.js');
app.use('/assets', express.static('app/views/assets'));
app.use('/public', express.static('app/views/static'));
Server.startServer();
