import Animal from "../../../domain/entities/Animal";
import AnimalRepository from "../../../domain/repository/Animal/AnimalRepository";

export default class GetAnimal {
  constructor(readonly animalRepository: AnimalRepository) {}

  async execute(id: string): Promise<Animal | undefined> {
    const animal = await this.animalRepository.find(id);
    return animal;
  }
}
