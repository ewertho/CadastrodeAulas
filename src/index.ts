import express from "express";
import "express-async-errors";
import { AppDataSource } from "./data-source";
import { errorMiddleware } from "./middleware/error";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./../swagger.json";

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());
  // Redirecionar a rota inicial para "/api-docs"
  app.get("/", (req, res) => {
    res.redirect("/api-docs");
  });

  var options = {
    customSiteTitle: "Cadastro de Aulas",
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
  };
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, options));
  app.use("/v1", routes);
  app.use(errorMiddleware);
  return app.listen(process.env.PORT, () => {
    console.log(`Backend is running on port ${process.env.PORT}`);
  });
});
