const express = require('express');
const config = require('config');
const consign = require('consign');
const MySql = require('../libs/MySql');
const cors = require('cors');

//init MySQL
MySql.setConnectionParams(
    config.get('dataBase.host'),
    config.get('dataBase.port'),
    config.get('dataBase.user'),
    config.get('dataBase.password'),
    config.get('dataBase.schema')
);

module.exports = () => {
    const server = express();
    
    // CORS DISABLED FOR LOCALHOST
    server.use(cors());
    
    server.set('port', process.env.PORT || config.get('server.port'));
    server.use(express.json());

    

    //config Auto Paths into Server
    consign({cwd: 'api'})
        .then('data')
        .then('controllers')
        .then('routes')
        .into(server);

    return server;
};