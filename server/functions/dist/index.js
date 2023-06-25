"use strict";
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.webApi = void 0;
const functions = require("firebase-functions");
// import * as admin from 'firebase-admin';
const express = require("express");
const countries_1 = require("./lib/countries");
const persons_1 = require("./lib/persons");
const cors = require("cors");
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
        const data = (0, persons_1.persons)().getPersons();
        res.status(200).json(data);
    }
    catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: `failed to get persons with error: ${error.message} ` });
    }
});
app.post('/api/person', jsonMiddleware, (req, res) => {
    try {
        (0, persons_1.persons)().addPerson(req.body);
        res.status(201).json({ message: "person was created successfuly " });
    }
    catch (error) {
        res.status(500).json({ error: `failed to create a person with error: ${error.message}` });
    }
});
app.get('/api/cities/:countryId', (req, res) => {
    try {
        const cities = (0, countries_1.countries)().getCitiesByCountryId(+req.params.countryId);
        res.status(200).json(cities);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/api/city', jsonMiddleware, (req, res) => {
    try {
        (0, countries_1.countries)().addCity(req.body);
        res.status(201).json({ message: "city was added successfuly " });
    }
    catch (error) {
        res.status(500).json({ error: `failed to add a city with error: ${error.message}` });
    }
});
app.get('/api/countries', (req, res) => {
    try {
        const data = (0, countries_1.countries)().getCountries();
        res.status(200).json(data);
    }
    catch (error) {
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
exports.webApi = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map