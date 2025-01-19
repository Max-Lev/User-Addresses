"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swaggerInit = void 0;
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var swaggerInit = exports.swaggerInit = function swaggerInit(app) {
  var swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Demo Server API',
        version: '1.0.0'
      }
    },
    apis: ['./swagger.yaml']
  };
  var swaggerSpec = (0, _swaggerJsdoc["default"])(swaggerOptions);
  app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerSpec));
};