"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountryById = exports.getCountries = exports.getCitiesByCountryId = exports.addCity = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _logger = _interopRequireDefault(require("../logger.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var countries = function countries() {
  var data = [{
    id: 1,
    name: "Israel",
    cities: []
  }, {
    id: 2,
    name: "France",
    cities: []
  }, {
    id: 3,
    name: "Brazil",
    cities: []
  }];
  var getCountryById = function getCountryById(id) {
    return data.filter(function (country) {
      return country.id === id;
    });
  };
  var getCitiesByCountryId = function getCitiesByCountryId(id) {
    var country = getCountryById(id);
    if (!country.length) {
      throw new Error("No country with Id: ".concat(id));
    }
    return country[0].cities;
  };
  return {
    addCity: function addCity(payload) {
      var countryId = payload.countryId,
        name = payload.name;
      if (_lodash["default"].some([name], _lodash["default"].isEmpty) && !isNaN(countryId)) {
        throw new Error('Missing or invalid argument for adding a city [countryId, cityId, name]');
      }
      var country = getCountryById(countryId);
      if (!country.length) {
        throw new Error("No country with Id: ".concat(countryId));
      }
      var cities = country[0].cities;
      var cityId = cities.length;
      var city = cities.filter(function (city) {
        return city.name === name;
      });
      if (city.length) {
        _logger["default"].warn("city already exists id: ".concat(city[0].id, " name: ").concat(city[0].name, " "));
        ;
        return;
      }
      cities.push({
        id: cityId,
        name: name
      });
    },
    getCountries: function getCountries() {
      return data;
    },
    getCountryById: getCountryById,
    getCitiesByCountryId: getCitiesByCountryId
  };
};
var _countries = countries(),
  addCity = exports.addCity = _countries.addCity,
  getCountries = exports.getCountries = _countries.getCountries,
  getCountryById = exports.getCountryById = _countries.getCountryById,
  getCitiesByCountryId = exports.getCitiesByCountryId = _countries.getCitiesByCountryId;