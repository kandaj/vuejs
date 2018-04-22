/*
 * European Variation Archive (EVA) - Open-access database of all types of genetic
 * variation data from all species
 *
 * Copyright 2017 EMBL - European Bioinformatics Institute
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Basic Setup
var http     = require('http'),
    express  = require('express'),
    parser   = require('body-parser'),
    files    = require('./routes/files'),
    postgres = require('./routes/postgresFiles'),
    pea = require('./routes/peaFiles'),
    authenticate = require('./routes/authenticate'),
    path = require("path"),
    webRoot = __dirname + '/../../dist/',
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger/swagger.json'),
    history = require('connect-history-api-fallback'),
    _ = require('underscore'),
    morgan = require('morgan'),
    jwt = require('jsonwebtoken')

// Setup express
var app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(morgan('dev'));
app.set('port', process.env.PORT || 5000);
app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

if (!_.isUndefined(process.env.STATIC_HTML)) {
  app.use(history())
  app.get('/', function(req, res) {
    res.sendFile(path.join(webRoot + 'index.html'))
  });

  app.use('/', express.static(webRoot))
} else {
  app.get('/', function (req, res) {
    res.send('<html><body><h1>EGA Internal API</h1></body></html>');
  });

}




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/files', files);
app.use('/api/v1', postgres);
app.use('/api/v1', pea);
app.use('/api/v1', authenticate);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Create server
 var httpServer = http.createServer(app).listen(app.get('port'), function(){
    console.log('Server listening on port ' + app.get('port'));
});

process.on('SIGINT', function () {
    console.log("Closing");
    httpServer.close();
    process.exit(0)
});



