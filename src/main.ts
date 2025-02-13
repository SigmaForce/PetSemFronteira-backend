import express from "express";
import AnimalRoutes from "./infra/http/routes/AnimalRoutes";

async function main() {
  const app = express();
  app.use(express.json());
  app.use("/animal", AnimalRoutes);

  app.listen(3000);
}

main();
