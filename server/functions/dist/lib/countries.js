"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countries = void 0;
// const _ = require("lodash");
const _ = require("lodash");
// import { logger } from '../logger';
// import logger from '../logger';
// const logger = require("../logger.js");
// import logger from "../logger.ts";
const countries = () => {
    const data = [{
            id: 1,
            name: "Italy",
            cities: []
        },
        {
            id: 2,
            name: "France",
            cities: []
        },
        {
            id: 3,
            name: "Brazil",
            cities: []
        }];
    const getCountryById = (id) => data.filter((country) => country.id === id);
    const getCitiesByCountryId = (id) => {
        const country = getCountryById(id);
        if (!country.length) {
            throw new Error(`No country with Id: ${id}`);
        }
        return country[0].cities;
    };
    return {
        addCity: (payload) => {
            const { countryId, name } = payload;
            if (_.some([name], _.isEmpty) && !isNaN(countryId)) {
                throw new Error('Missing or invalid argument for adding a city [countryId, cityId, name]');
            }
            const country = getCountryById(countryId);
            if (!country.length) {
                throw new Error(`No country with Id: ${countryId}`);
            }
            const cities = country[0].cities;
            const cityId = cities.length;
            const city = cities.filter((city) => city.name === name);
            if (city.length) {
                logger().warn(`city already exists id: ${city[0].id} name: ${city[0].name} `);
                ;
                return;
            }
            cities.push({ id: cityId, name });
        },
        getCountries: () => data,
        getCountryById,
        getCitiesByCountryId,
    };
};
exports.countries = countries;
//# sourceMappingURL=countries.js.map