import Animal from "../../../domain/entities/Animal";
import AnimalRepository from "../../../domain/repository/Animal/AnimalRepository";
import { InternalServerError } from "../../../shared/errors/Errors";
import DatabaseConnection from "../config/DatabaseConnection";

export default class AnimalRepositoryDatabase implements AnimalRepository {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async create(animal: Animal): Promise<number | undefined> {
    try {
      const [res] = await this.databaseConnection.query(
        'INSERT INTO "Animal" (id, name, species, gender, breed, age, size, status, description, image_url, location, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id',
        [
          animal.animalId,
          animal.name,
          animal.species,
          animal.gender,
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
      return res.id;
    } catch (error: unknown) {
      throw new InternalServerError({ cause: error });
    }
  }

  async find(id: number): Promise<Animal | Boolean> {
    try {
      const [animal] = await this.databaseConnection.query(
        'SELECT * FROM "Animal" WHERE id = $1',
        [id]
      );

      return {
        animalId: +animal.id,
        name: animal.name,
        species: animal.species,
        gender: animal.gender,
        breed: animal.breed,
        age: +animal.age,
        size: animal.size,
        status: animal.status,
        description: animal.description,
        image_url: animal.image_url,
        location: animal.location,
        user_id: +animal.user_id,
      };
    } catch (error) {
      throw new InternalServerError({ cause: error });
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.databaseConnection.query(
        'DELETE FROM "Animal" WHERE id = $1',
        [id]
      );
    } catch (error) {
      throw new InternalServerError({ cause: error });
    }
  }
}
