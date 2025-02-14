import Animal from "../../entities/Animal";

export default interface AnimalRepository {
  create(animal: Animal): Promise<string | undefined>;
  find(id: string): Promise<Animal | undefined>;
  delete(id: string): Promise<void>;
}
