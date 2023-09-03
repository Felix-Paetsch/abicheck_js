const express = require('express');
const CONF = require("./config.js");
const compression = require('compression');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(compression())
    
    app.use(express.static('public'));
    app.set('view engine', 'ejs');

    app.use(express.json({limit: CONF.json_limit}));
    app.use(bodyParser.urlencoded({ extended: false }));
}