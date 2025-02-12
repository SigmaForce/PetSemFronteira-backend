import Animal from "../../entities/Animal";

export default interface AnimalRepository {
  create(animal: Animal): Promise<number | undefined>;
  find(id: number): Promise<Animal | Boolean>;
  delete(id: number): Promise<void>;
}
