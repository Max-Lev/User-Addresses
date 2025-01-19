const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { swaggerInit } = require('./swagger.js');
const { addPerson, getPersons } = require('./lib/persons.js');
const { addCity, getCitiesByCountryId, getCountries } = require('./lib/countries.js');
const logger = require('./logger.js');
const figlet = require('figlet');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();
const app = express();
const port = 3000;
const jsonMiddleware = express.json();
const corsOptions = {
  origin: ['http://localhost:4200','https://addresses-f230c.firebaseapp.com', 'https://addresses-f230c.web.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods (adjust if needed)
  allowedHeaders: ['Content-Type'], // Add custom headers if needed
  credentials: true, // Allow cookies and credentials if needed
};
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://addresses-f230c.firebaseapp.com','http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(cors(corsOptions)); // Handle preflight request for all routes
// app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors({ origin: '*' }));

app.use(express.static('../public/dist/sea-lights/'));
app.set('view engine', 'pug');
swaggerInit(app);

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.sendFile('index.html', { root: __dirname });
});

app.get('/api/persons', (req, res) => {
  try {
    const data = getPersons();
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: `failed to get persons with error: ${error.message}` });
  }
});

app.post('/api/person', jsonMiddleware, (req, res) => {
  try {
    addPerson(req.body);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.status(201).json({ message: "person was created successfully" });
  } catch (error) {
    res.status(500).json({ error: `failed to create a person with error: ${error.message}` });
  }
});

app.get('/api/cities/:countryId', (req, res) => {
  try {
    const cities = getCitiesByCountryId(+req.params.countryId);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/city', jsonMiddleware, (req, res) => {
  try {
    addCity(req.body);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.status(201).json({ message: "city was added successfully" });
  } catch (error) {
    res.status(500).json({ error: `failed to add a city with error: ${error.message}` });
  }
});

app.get('/api/countries', (req, res) => {
  try {
    const data = getCountries();
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: `failed to get countries with error: ${error.message}` });
  }
});

app.listen(port, () => {
  const title = figlet.textSync("Demo Server", { font: "Standard" });
  logger.default.log(title, "\n\n");
  logger.default.info(`Listening to port ${port}`);
});

const api = functions.https.onRequest(app);
module.exports = { api };
