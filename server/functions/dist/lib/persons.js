"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.persons = void 0;
const _ = require("lodash");
// let addPerson;
const persons = () => {
    const persons = [];
    const addPerson = (persons) => (payload) => {
        const { name, birthdate, addresses } = payload;
        if (_.some([name, addresses], _.isEmpty)) {
            throw new Error('Missing or invalid argument for adding a city [name, addresses]');
        }
        const id = persons.length;
        persons.push({
            id,
            name: name || "NA",
            birthdate: birthdate || "NA",
            addresses
        });
    };
    return {
        addPerson: addPerson(persons),
        getPersons: () => persons
    };
};
exports.persons = persons;
//# sourceMappingURL=persons.js.map