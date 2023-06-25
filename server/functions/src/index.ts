/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
// import { countries } from './lib/countries';
// import { persons } from './lib/persons';
import countries = require('./lib/countries');
import persons = require('./lib/persons');
import cors = require('cors');
import { addPerson, getPersons } from './lib/persons';
import { addCity, getCitiesByCountryId, getCountries } from './lib/countries';

const app = express();
// import cors = require('cors');
app.use(cors({ origin: true }));
const jsonMiddleware = express.json();

// app.use('/api/v1', app);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/init1', (req, res) => {
//     res.status(200).send(`<h1>Demo Server</h1>`);
//     // res.sendFile('index.html', { root: __dirname })
// });
// export const init = onRequest((req, res) => {
//     res.status(200).send(`<h1>Demo Server</h1>`);
//     // res.sendFile('index.html', { root: __dirname })
// });

// export const helloWorld = onRequest((request, response) => {
//     logger.info("Hello logs!", { structuredData: true });
//     response.send("Hello from Firebase!");
// });
// app.use(express.static('../../../public/dist/sea-lights/'));
app.get('/api/persons', (req, res) => {
    try {
        const data = getPersons();
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);

    } catch (error: any) {
        console.error('An error occurred:', error);
        res.set('Access-Control-Allow-Origin', '*');
        res.status(500).json({ error: `failed to get persons with error: ${error.message} ` });
    }
});

app.post('/api/person', jsonMiddleware, (req, res) => {
    try {

        addPerson(req.body);
        res.set('Access-Control-Allow-Origin', '*');
        res.status(201).json({ message: "person was created successfuly " });
    } catch (error: any) {
        res.set('Access-Control-Allow-Origin', '*');
        res.status(500).json({ error: `failed to create a person with error: ${error.message}` })
    }
});

app.get('/api/cities/:countryId', (req, res) => {
    try {
        const cities = getCitiesByCountryId(+req.params.countryId);
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(cities);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/city', jsonMiddleware, (req, res) => {
    try {
        addCity(req.body);
        res.set('Access-Control-Allow-Origin', '*');
        res.status(201).json({ message: "city was added successfuly " });
    } catch (error: any) {
        res.status(500).json({ error: `failed to add a city with error: ${error.message}` });
    }
});

app.get('/api/countries', (req, res) => {
    try {
        const data = getCountries();
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);

    } catch (error: any) {
        res.status(500).json({ error: `failed to get countries with error: ${error.message} ` });
    }
});

// app.listen(3000, () => {
//     // const title = figlet.textSync("Demo Server", {
//     //     font: "Standard",
//     //     horizontalLayout: "default",
//     //     verticalLayout: "default",
//     //     whitespaceBreak: false
//     // });
//     // logger().log(title, "\n\n");
//     // logger().info(`Listening to port ${3000} \n`);
// });

export const webApi = functions.https.onRequest(app);