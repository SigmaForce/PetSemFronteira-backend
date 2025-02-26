import UserRepository from "../../../domain/repository/User/UserRepository";
import { InvalidCredentialsError } from "../../../shared/errors/Errors";
import { createHash } from "../../../shared/utils/hash";

export class UpdateUser {
  constructor(readonly userRepository: UserRepository) {}

  async execute(userData: Input) {
    const user = await this.userRepository.findById(userData.userId);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    if (userData.password != undefined) {
      userData.password = await createHash(userData.password);
    }

    Object.assign(user, userData);

    await this.userRepository.update(user);
  }
}

type Input = {
  userId: string;
  nickname?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  birthDate?: Date;
  phone?: string;
  role?: "ADMIN" | "USER" | "ONG";
  status?: boolean;
  description?: string;
  image_url?: string;
};
