import Animal from "../../../domain/entities/Animal";
import AnimalRepository from "../../../domain/repository/Animal/AnimalRepository";
import DatabaseConnection from "../config/DatabaseConnection";

export default class AnimalRepositoryDatabase implements AnimalRepository {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async create(animal: Animal): Promise<void> {
    try {
      const hasAnimalWithThisId = await this.findById(animal.animalId);

      if (hasAnimalWithThisId === false) {
        await this.databaseConnection.query(
          'INSERT INTO "Animal" (id, name, species, breed, age, size, status, description, image_url, location, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
          [
            animal.animalId,
            animal.name,
            animal.species,
            animal.breed,
            animal.age,
            animal.size,
            animal.status,
            animal.description,
            animal.image_url,
            animal.location,
            animal.user_id,
          ]
        );
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async findById(id: number): Promise<Animal | Boolean> {
    try {
      const animal = await this.databaseConnection.query(
        'SELECT * FROM "Animal" WHERE id = $1',
        [id]
      );

      return {
        animalId: +animal[0].id,
        name: animal[0].name,
        species: animal[0].species,
        breed: animal[0].breed,
        age: +animal[0].age,
        size: animal[0].size,
        status: animal[0].status,
        description: animal[0].description,
        image_url: animal[0].image_url,
        location: animal[0].location,
        user_id: animal[0].user_id,
      };
    } catch (error) {
      return false;
    }
  }
}
