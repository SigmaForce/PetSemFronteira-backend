import AnimalRepository from "../../../domain/repository/Animal/AnimalRepository";
import { InternalServerError } from "../../../shared/errors/Errors";

export default class CreateAnimal {
  constructor(readonly animalRepository: AnimalRepository) {}

  async execute(input: Input): Promise<Output | undefined> {
    try {
      const animal = {
        name: input.name,
        species: input.species,
        gender: input.gender,
        breed: input.breed,
        age: input.age,
        size: input.size,
        status: input.status,
        description: input.description,
        image_url: input.image_url,
        location: input.location,
        user_id: input.user_id,
      };
      const animalId = await this.animalRepository.create(animal);

      if (animalId) return { animalId };
    } catch (err) {
      throw new InternalServerError({ cause: err });
    }
  }
}

type Input = {
  name: string;
  species: string;
  gender: string;
  breed?: string;
  age: number;
  size: string;
  status: string;
  description: string;
  image_url?: string;
  location?: string;
  user_id: string;
};

type Output = {
  animalId: string;
};
