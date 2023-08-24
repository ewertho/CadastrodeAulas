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
    customfavIcon: "https://avatars.githubusercontent.com/u/6936373?s=200&v=4",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
    ],
    customCssUrl: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
    ],
  };
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, options));
  app.use("/v1", routes);
  app.use(errorMiddleware);
  return app.listen(process.env.PORT, () => {
    console.log(`Backend is running on port ${process.env.PORT}`);
  });
});
