"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerInit = (app) => {
    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Demo Server API',
                version: '1.0.0',
            }
        },
        apis: ['./swagger.yaml']
    };
    const swaggerSpec = swaggerJSDoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
exports.default = swaggerInit;
// module.exports = swaggerInit;
//# sourceMappingURL=swagger.js.map