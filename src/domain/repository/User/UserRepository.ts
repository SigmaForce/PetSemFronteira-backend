import User from "../../entities/User";

export default interface UserRepository {
  create(user: User): Promise<string | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  //update(user: User): Promise<string | undefined>;
  delete(id: string): Promise<void>;
}
