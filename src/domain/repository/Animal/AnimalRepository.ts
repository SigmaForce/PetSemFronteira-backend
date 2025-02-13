import Animal from "../../entities/Animal";

export default interface AnimalRepository {
  create(animal: Animal): Promise<number | undefined>;
  find(id: number): Promise<Animal | undefined>;
  delete(id: number): Promise<void>;
}
