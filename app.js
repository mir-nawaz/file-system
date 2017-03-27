'use strict';

let http = require('http');
let express = require('express');
let lib = require('./lib');
let path = require('path');
let config = require('./config.json');

let app = express();

global.dir = `${path.resolve(__dirname)}${config.rootDir}`;
global.host = `http://localhost:${config.port}/`;
global.home = __dirname;
global.webDir = `${__dirname}/web`;

app.use(express.static(global.dir));
app.use(express.static(global.webDir));

http.createServer(app).listen(config.port);

console.log(`Please open the link in your browser http://<YOUR-IP>: ${config.port}`);

app.get('/files', lib.get);

app.get('/challenge', lib.challenge);

app.get('/file-details', lib.fileDetails);

app.get('/', function(req, res) {
    res.redirect(`${global.webDir}/index.html`);
});
