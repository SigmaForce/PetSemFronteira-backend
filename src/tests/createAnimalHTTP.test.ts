import axios from "axios";
import { expect, test } from "vitest";

test("should create animal when request in /animal", async () => {
  const input = {
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

  const responseAnimal = await axios.post(
    "http://localhost:3000/animal",
    input
  );
  const outputCheckout = responseAnimal.data;

  expect(outputCheckout.animalId).toBeDefined();
  const animal = await axios.get(
    `http://localhost:3000/animal/${outputCheckout.animalId}`
  );

  expect(animal.data).toMatchObject({
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
  });
});

test("should return 500 when request body is invalid or empty", async () => {
  try {
    await axios.post("http://localhost:3000/animal");
  } catch (error: any) {
    expect(error.response.status).toBe(500);
  }
});
