"use strict";

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var _require = require('./swagger.js'),
  swaggerInit = _require.swaggerInit;
var _require2 = require('./lib/persons.js'),
  addPerson = _require2.addPerson,
  getPersons = _require2.getPersons;
var _require3 = require('./lib/countries.js'),
  addCity = _require3.addCity,
  getCitiesByCountryId = _require3.getCitiesByCountryId,
  getCountries = _require3.getCountries;
var logger = require('./logger.js');
var figlet = require('figlet');
var admin = require('firebase-admin');
var functions = require('firebase-functions');
admin.initializeApp();
var app = express();
const corsOptions = {
  origin: ['http://localhost:4200','https://addresses-f230c.firebaseapp.com','https://addresses-f230c.web.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods (adjust if needed)
  allowedHeaders: ['Content-Type'], // Add custom headers if needed
  credentials: true, // Allow cookies and credentials if needed
};
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://addresses-f230c.firebaseapp.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// app.options('*', cors(corsOptions)); // Handle preflight request for all routes
app.use(cors(corsOptions));
var port = 3000;
var jsonMiddleware = express.json();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// app.use(express["static"]('../public/dist/sea-lights/'));
// app.set('view engine', 'pug');
swaggerInit(app);
app.get('/', function (req, res) {
  // res.setHeader('Content-Type', 'application/json');
  // res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  // res.sendFile('index.html', {
  //   root: __dirname
  // });
  res.jsonp({response: 'index.html'});
});
app.get('/api/persons', function (req, res) {
  try {
    var data = getPersons();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "failed to get persons with error: ".concat(error.message)
    });
  }
});
app.post('/api/person', jsonMiddleware, function (req, res) {
  try {
    addPerson(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.status(201).json({
      message: "person was created successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: "failed to create a person with error: ".concat(error.message)
    });
  }
});
app.get('/api/cities/:countryId', function (req, res) {
  try {
    var cities = getCitiesByCountryId(+req.params.countryId);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});
app.post('/api/city', jsonMiddleware, function (req, res) {
  try {
    addCity(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.status(201).json({
      message: "city was added successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: "failed to add a city with error: ".concat(error.message)
    });
  }
});
app.get('/api/countries', function (req, res) {
  try {
    var data = getCountries();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "failed to get countries with error: ".concat(error.message)
    });
  }
});
app.listen(port, function () {
  var title = figlet.textSync("Demo Server", {font: "Standard"});
  console.log('server running ',port);
  logger["default"].log(title, "\n\n");
  logger["default"].info("Listening to port ".concat(port));
});

exports.api = functions.https.onRequest(app);