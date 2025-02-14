import User from "../../../domain/entities/User";
import UserRepository from "../../../domain/repository/User/UserRepository";
import { InternalServerError } from "../../../shared/errors/Errors";
import DatabaseConnection from "../config/DatabaseConnection";

export default class UserRepositoryDatabase implements UserRepository {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async create(user: User): Promise<string | undefined> {
    try {
      const [res] = await this.databaseConnection.query(
        'INSERT INTO "users" (nick_name, email, first_name, last_name, birthdate, password_hash, phone, role, description, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
        [
          user.nickName,
          user.email,
          user.firstName,
          user.lastName,
          user.birthDate,
          user.password,
          user.phone,
          user.role,
          user.description,
          user.image_url,
        ]
      );
      return res.id;
    } catch (err) {
      throw new InternalServerError({ cause: err });
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const [user] = await this.databaseConnection.query(
        'SELECT * FROM "users" WHERE email = $1',
        [email]
      );

      if (!user) return;

      return {
        userId: user.id,
        nickName: user.nick_name,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        birthDate: user.birthdate,
        password: user.password_hash,
        phone: user.phone,
        role: user.role,
        description: user.description,
        image_url: user.image_url,
      };
    } catch (error) {
      throw new InternalServerError({ cause: error });
    }
  }

  async delete(email: string): Promise<void> {
    try {
      await this.databaseConnection.query(
        'DELETE FROM "users" WHERE email = $1',
        [email]
      );
    } catch (error) {
      throw new InternalServerError({ cause: error });
    }
  }
}
