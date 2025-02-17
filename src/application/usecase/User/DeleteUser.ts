import UserRepository from "../../../domain/repository/User/UserRepository";

export default class DeleteUser {
  constructor(readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
