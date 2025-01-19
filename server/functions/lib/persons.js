"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPersons = exports.addPerson = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var persons = function persons() {
  var persons = [];
  var addPerson = function addPerson(persons) {
    return function (payload) {
      var name = payload.name,
        birthdate = payload.birthdate,
        addresses = payload.addresses;
      if (_lodash["default"].some([name, addresses], _lodash["default"].isEmpty)) {
        throw new Error('Missing or invalid argument for adding a city [name, addresses]');
      }
      var id = persons.length;
      persons.push({
        id: id,
        name: name || "NA",
        birthdate: birthdate || "NA",
        addresses: addresses
      });
    };
  };
  return {
    addPerson: addPerson(persons),
    getPersons: function getPersons() {
      return persons;
    }
  };
};
var _persons = persons(),
  addPerson = exports.addPerson = _persons.addPerson,
  getPersons = exports.getPersons = _persons.getPersons;