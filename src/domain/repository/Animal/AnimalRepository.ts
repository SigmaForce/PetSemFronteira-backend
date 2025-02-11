import Animal from "../../entities/Animal";

export default interface AnimalRepository {
  create(animal: Animal): Promise<void>;
  findById(id: number): Promise<Animal | Boolean>;
}
