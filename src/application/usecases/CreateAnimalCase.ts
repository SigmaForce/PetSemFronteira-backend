import Animal from "../../domain/entities/Animal";
import AnimalRepository from "../../domain/repository/Animal/AnimalRepository";

export default class CreateAnimalCase {
  constructor(readonly animalRepository: AnimalRepository) {}

  async execute(animal: Animal): Promise<void> {
    try {
      await this.animalRepository.create(animal);
    } catch (err) {
      console.log(err);
    }
  }
}
