/* jshint esversion:6, node: true */

'use strict';

const routes = require('express').Router(),
      path   = require('path');

routes.get('/', (req, res) => {
    
    res
        .status(200)
        .sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports = routes;
