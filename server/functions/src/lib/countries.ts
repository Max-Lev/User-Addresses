// const _ = require("lodash");
import * as _ from 'lodash';
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

    const getCountryById = (id: any) => data.filter((country) => country.id === id);
    const getCitiesByCountryId = (id: any) => {
        const country = getCountryById(id);
        if (!country.length) {
            throw new Error(`No country with Id: ${id}`);
        }

        return country[0].cities;
    };

    return {
        addCity: (payload: any) => {
            const { countryId, name } = payload;
            if (_.some([name], _.isEmpty) && !isNaN(countryId)) {
                throw new Error('Missing or invalid argument for adding a city [countryId, cityId, name]');
            }
            const country = getCountryById(countryId);
            if (!country.length) {
                throw new Error(`No country with Id: ${countryId}`);
            }
            const cities: any = country[0].cities;
            const cityId = cities.length;
            const city = cities.filter((city: any) => city.name === name);
            if (city.length) {
                logger().warn(`city already exists id: ${city[0].id} name: ${city[0].name} `);;
                return;
            }
            cities.push({ id: cityId, name });
        },
        getCountries: () => data,
        getCountryById,
        getCitiesByCountryId,
    }
};

export const {
    addCity,
    getCountries,
    getCountryById,
    getCitiesByCountryId
} = countries();
// module.exports = {
//     addCity,
//     getCountries,
//     getCountryById,
//     getCitiesByCountryId
// } = countries();
// export {
//     countries
// };