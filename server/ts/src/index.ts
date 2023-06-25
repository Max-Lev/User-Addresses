import express from "express";
// import cors from "cors";
import bodyParser from "body-parser";
import { swaggerInit } from './swagger';
// import {addPerson} from './lib/persons';
import { persons } from './lib/persons';
import { countries } from './lib/countries';
// import logger from "./logger.js";
import figlet from "figlet";
// const functions = require("firebase-functions");
// import admin from "firebase-admin";
import { logger } from './logger';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cors from 'cors';

// import logger from './logger';

// import { getPersons } from '../../lib/persons.js';

// admin.initializeApp(functions.config().firebase);


const app = express();
// const port = process.env.PORT || 3000;
const port = 3000;
const jsonMiddleware = express.json();
// app.use('/api/v1', app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));

app.use(express.static('../../public/dist/sea-lights/'));
// app.set('view engine', 'pug');

swaggerInit(app);

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    // res.status(200).send(`<h1>Demo Server</h1>`);
    res.sendFile('index.html', { root: __dirname })
});

app.get('/api/persons', (req, res) => {
    try {
        const data = persons().getPersons();
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
        res.status(200).json(data);

    } catch (error: any) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: `failed to get persons with error: ${error.message} ` });
    }
});

app.post('/api/person', jsonMiddleware, (req, res) => {
    try {

        persons().addPerson(req.body);
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
        res.status(201).json({ message: "person was created successfuly " });
    } catch (error: any) {
        res.status(500).json({ error: `failed to create a person with error: ${error.message}` })
    }
});

app.get('/api/cities/:countryId', (req, res) => {
    try {
        const cities = countries().getCitiesByCountryId(+req.params.countryId);
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
        res.status(200).json(cities);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/city', jsonMiddleware, (req, res) => {
    try {
        countries().addCity(req.body);
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
        res.status(201).json({ message: "city was added successfuly " });
    } catch (error: any) {
        res.status(500).json({ error: `failed to add a city with error: ${error.message}` });
    }
});

app.get('/api/countries', (req, res) => {
    try {
        const data = countries().getCountries();
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
        res.status(200).json(data);

    } catch (error: any) {
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
    logger().log(title, "\n\n");
    logger().info(`Listening to port ${port} \n`);
});

// Export the Express API
// module.exports = app;
// module.exports = app;
exports.app = functions.https.onRequest(app);
// exports.webApi = functions.https.onRequest(app);