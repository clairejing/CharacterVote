/*let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');
*/

/*var swig = require('swig');
var React = require('react');
var Router = require('react-router');
var routes = require('./app/routes');
*/

import swig from 'swig';
import React from 'react';
import Router from 'react-router';
import routes from './app/routes';

import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';


let app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  Router.run(routes, req.path, (Handler) => {
    let html = React.renderToString(React.createElement(Handler));
    let page = swig.renderFile('views/index.html', {html: html});
    res.send(page);
  });
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port' + app.get('port'));
});