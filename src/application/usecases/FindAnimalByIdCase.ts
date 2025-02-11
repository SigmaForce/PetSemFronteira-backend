import Animal from "../../domain/entities/Animal";
import AnimalRepository from "../../domain/repository/Animal/AnimalRepository";

export default class findAnimalByIdCase {
  constructor(readonly animalRepository: AnimalRepository) {}

  async execute(id: number): Promise<Animal | Boolean> {
    const animal = await this.animalRepository.findById(id);
    return animal;
  }
}
