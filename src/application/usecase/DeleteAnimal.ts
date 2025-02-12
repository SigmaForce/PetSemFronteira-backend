import AnimalRepository from "../../domain/repository/Animal/AnimalRepository";

export default class DeleteAnimal {
  constructor(readonly animalRepository: AnimalRepository) {}

  async execute(id: number): Promise<void> {
    await this.animalRepository.delete(id);
  }
}
