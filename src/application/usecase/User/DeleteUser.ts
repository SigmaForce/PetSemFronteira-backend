import UserRepository from "../../../domain/repository/User/UserRepository";

export default class DeleteUser {
  constructor(readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<void> {
    await this.userRepository.delete(email);
  }
}
