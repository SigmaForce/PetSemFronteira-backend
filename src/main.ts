import express from "express";
import AnimalRoutes from "./infra/http/routes/AnimalRoutes";
import UserRoutes from "./infra/http/routes/UserRoutes";

async function main() {
  const app = express();
  app.use(express.json());
  app.use("/animal", AnimalRoutes);
  app.use("/user", UserRoutes);

  app.listen(3000);
}

main();
