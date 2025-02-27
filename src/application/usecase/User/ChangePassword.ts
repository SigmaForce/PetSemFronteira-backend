import UserRepository from "../../../domain/repository/User/UserRepository";
import {
  ForbiddenError,
  InvalidCredentialsError,
} from "../../../shared/errors/Errors";
import { createHash, verifyHash } from "../../../shared/utils/hash";

export default class ChangePassword {
  constructor(readonly userRepository: UserRepository) {}

  async execute({ userId, oldPassword, newPassword }: Input): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatch = await verifyHash(oldPassword, user.password);
    if (!passwordMatch) {
      throw new ForbiddenError({ message: "oldPassword does not match" });
    }

    const newPasswordHash = await createHash(newPassword);

    const userData = {
      userId: userId,
      password: newPasswordHash,
    };

    Object.assign(user, userData);

    await this.userRepository.update(user);
  }
}

type Input = {
  userId: string;
  oldPassword: string;
  newPassword: string;
};
