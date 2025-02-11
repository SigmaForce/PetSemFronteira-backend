import { expect, test } from "vitest";
import CreateAnimalCase from "../../application/usecases/CreateAnimalCase";
import FindAnimalByIdCase from "../../application/usecases/FindAnimalByIdCase";
import { pgPromiseAdapter } from "../../infra/database/config/DatabaseConnection";
import AnimalRepositoryDatabase from "../../infra/database/repository/AnimalRepositoryDatabase";
test("should create a animal", async () => {
  const databaseConnection = new pgPromiseAdapter();
  const animalRepository = new AnimalRepositoryDatabase(databaseConnection);
  const createAnimal = new CreateAnimalCase(animalRepository);
  const findAnimalById = new FindAnimalByIdCase(animalRepository);

  const animalInput = {
    animalId: 1,
    name: "Joca",
    species: "Cachorro",
    breed: "SRD",
    age: 4,
    size: "Pequeno Porte",
    status: "Disponivel",
    description: "Animal docil",
    image_url: "/image.png",
    location: "-22.55785, -22.55785",
    user_id: 1,
  };

  await createAnimal.execute(animalInput);

  const animal = await findAnimalById.execute(1);

  expect(animal).toMatchObject({
    animalId: 1,
    name: "Joca",
    species: "Cachorro",
    breed: "SRD",
    age: 4,
    size: "Pequeno Porte",
    status: "Disponivel",
    description: "Animal docil",
    image_url: "/image.png",
    location: "-22.55785, -22.55785",
    user_id: "1",
  });
});
