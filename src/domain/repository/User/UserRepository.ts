import User from "../../entities/User";

export default interface UserRepository {
  create(user: User): Promise<string | undefined>;
  //findByID(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  //update(user: User): Promise<string | undefined>;
  delete(email: string): Promise<void>;
}
