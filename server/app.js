import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { swaggerInit } from "./swagger.js"
import { addPerson, getPersons } from "./lib/persons.js";
import { addCity, getCitiesByCountryId, getCountries } from "./lib/countries.js";
import logger from "./logger.js";
import figlet from "figlet";
import functions from "firebase-functions";
import admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);
const app = express();
const port = 3000;
const jsonMiddleware = express.json();
// app.use('/api/v1', app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));
// app.use(cors({
//   origin: 'https://user-addresses.vercel.app/',
//   optionsSuccessStatus: 200
// }));
app.use(express.static('../public/dist/sea-lights/'));
app.set('view engine', 'pug');

swaggerInit(app);

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  // res.status(200).send(`<h1>Demo Server</h1>`);
  res.sendFile('index.html', { root: __dirname })
});

app.get('/api/persons', (req, res) => {
  try {
    const data = getPersons();
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.status(200).json(data);

  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: `failed to get persons with error: ${error.message} ` });
  }
});

app.post('/api/person', jsonMiddleware, (req, res) => {
  try {
    addPerson(req.body);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.status(201).json({ message: "person was created successfuly " });
  } catch (error) {
    res.status(500).json({ error: `failed to create a person with error: ${error.message}` })
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
    res.status(201).json({ message: "city was added successfuly " });
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
    res.status(500).json({ error: `failed to get countries with error: ${error.message} ` });
  }
});

app.listen(port, () => {
  const title = figlet.textSync("Demo Server", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
    whitespaceBreak: false
  });
  logger.log(title, "\n\n");
  logger.info(`Listening to port ${port} \n`);
});

// Export the Express API
// module.exports = app;
export default app;
// exports.webApi = functions.https.onRequest(app);
