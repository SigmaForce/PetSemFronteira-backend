import { expect, test } from "vitest";
import CreateAnimal from "../../application/usecase/Animal/CreateAnimal";
import DeleteAnimal from "../../application/usecase/Animal/DeleteAnimal";
import GetAnimal from "../../application/usecase/Animal/GetAnimal";
import { pgPromiseAdapter } from "../../infra/database/config/DatabaseConnection";
import AnimalRepositoryDatabase from "../../infra/database/repository/AnimalRepositoryDatabase";
test("should create a animal", async () => {
  const databaseConnection = new pgPromiseAdapter();
  const animalRepository = new AnimalRepositoryDatabase(databaseConnection);
  const createAnimal = new CreateAnimal(animalRepository);
  const getAnimal = new GetAnimal(animalRepository);
  const deleteAnimal = new DeleteAnimal(animalRepository);

  const input = {
    name: "Joca",
    species: "Cachorro",
    gender: "Male",
    breed: "SRD",
    age: 4,
    size: "Pequeno Porte",
    status: "Disponível",
    description: "Animal docil",
    image_url: "/image.png",
    location: "-22.55785, -22.55785",
    user_id: "64f01035-34e6-4309-ab66-23e3f9c4e397",
  };

  const animalId = await createAnimal.execute(input);
  if (animalId?.animalId) {
    const animal = await getAnimal.execute(animalId.animalId);

    expect(animal).toMatchObject({
      name: "Joca",
      species: "Cachorro",
      gender: "Male",
      breed: "SRD",
      age: 4,
      size: "Pequeno Porte",
      status: "Disponível",
      description: "Animal docil",
      image_url: "/image.png",
      location: "-22.55785, -22.55785",
      user_id: "64f01035-34e6-4309-ab66-23e3f9c4e397",
    });

    deleteAnimal.execute(animalId.animalId);
    const animalDeleted = await getAnimal.execute(animalId.animalId);
    expect(animalDeleted).toBeFalsy();
  }
});
