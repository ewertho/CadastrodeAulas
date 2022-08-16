import express from "express";
import "express-async-errors";
import { AppDataSource } from "./data-source";
import { errorMiddleware } from "./middleware/error";
import routes from "./routes";
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  app.use("/v1", routes);
  app.use(errorMiddleware);
  return app.listen(process.env.PORT);
});
