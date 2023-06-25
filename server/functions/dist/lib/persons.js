"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersons = exports.addPerson = void 0;
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
_a = persons(), exports.addPerson = _a.addPerson, exports.getPersons = _a.getPersons;
// module.exports = {
//     addPerson,
//     getPersons,
// // } = persons;
// export function persons;
// export {
//     persons
// }
//# sourceMappingURL=persons.js.map