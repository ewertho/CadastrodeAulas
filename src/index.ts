import express from "express";
import "express-async-errors";
import { AppDataSource } from "./data-source";
import { errorMiddleware } from "./middleware/error";
import routes from "./routes";
import "swagger-ui-themes/themes/3.x/theme-flattop.css";
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./../swagger.json");

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());
  // var options = {
  //   customSiteTitle: "Cadastro de Aulas",
  //   customCss: ".swagger-ui .topbar { color:#FFFF; backgroundcolor:#0000 }",
  // };
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  app.use("/v1", routes);
  app.use(errorMiddleware);
  return app.listen(process.env.PORT, () => {
    console.log(`Backend is running on port ${process.env.PORT}`);
  });
});
