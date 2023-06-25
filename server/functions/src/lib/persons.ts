import * as _ from 'lodash';

// let addPerson;
const persons = () => {

    const persons: any[] = [];

    const addPerson = (persons: any) => (payload: any) => {
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
        })
    }

    return {
        addPerson: addPerson(persons),
        getPersons: () => persons
    };
}

export const {
    addPerson,
    getPersons
} = persons();

// module.exports = {
//     addPerson,
//     getPersons,
// // } = persons;
// export function persons;

// export {
//     persons
// }