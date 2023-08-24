import express from "express";
import "express-async-errors";
import { AppDataSource } from "./data-source";
import { errorMiddleware } from "./middleware/error";
import routes from "./routes";
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./../swagger.json");

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());
  var options = {
    customSiteTitle: "Cadastro de Aulas",

    customJs: "/assets/scripts/custom.js",
    customCssUrl: "/assets/styles/custom.css",
  };
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, options));
  app.use("/v1", routes);
  app.use(errorMiddleware);
  return app.listen(process.env.PORT, () => {
    console.log(`Backend is running on port ${process.env.PORT}`);
  });
});
