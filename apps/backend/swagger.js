const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = setupSwagger;
