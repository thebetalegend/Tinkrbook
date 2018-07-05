/**
 * 
 * Generated by
 * 
   _____ _          __  __      _     _
  / ____| |        / _|/ _|    | |   | |
 | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
  \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
  ____) |   < (_| | | | || (_) | | (_| |  __/ |
 |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
 
 *                 
 *			www.skaffolder.com
 */


//IMPORT PROPERTY
const properties = require('./properties.js');

//IMPORT LIBRARY
const logger = require('./logger.js');
const express = require('express');
const app = module.exports = express();
const mongoose = require('mongoose');
const extend = require('extend');
const http = require('http');
const bodyParser = require('body-parser');

console.log("\r\n\r\n-----------------------------------\r\n\r\nStarting Locations \r\nGenerated by\r\n\r\n   _____ _          __  __      _     _           \r\n  / ____| |        / _|/ _|    | |   | |          \r\n | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __ \r\n  \\___ \\| |/ / _` |  _|  _/ _ \\| |/ _` |/ _ \\ '__|\r\n  ____) |   < (_| | | | || (_) | | (_| |  __/ |   \r\n |_____/|_|\\_\\__,_|_| |_| \\___/|_|\\__,_|\\___|_|   \r\n\r\nFor more documentation please visit https://skaffolder.com/#/documentation\r\n\r\n-----------------------------------\r\n\r\n");

// START IMPORT DB

require('./db/Locations_db_crud.js');
// END IMPORT DB

//ADD PARSE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//IMPORT SECURITY & RESOURCES
require('./security/security.js');
require('./security/securityMapping.js');

// SWAGGER
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
 
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//START APPLICATION
const server = http.Server(app);
app.use(express.static(properties.publicPath));

server.listen(properties.port, function() {
    logger.info('Server started on port ' + properties.port);
    logger.info('Swagger docs at http://localhost:' + properties.port + "/api/docs");
});
