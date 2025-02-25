import { compare } from "bcryptjs";
import UserRepository from "../../../domain/repository/User/UserRepository";
import { InvalidCredentialsError } from "../../../shared/errors/Errors";
import { encrypt } from "../../../shared/utils/jwt";

export default class AuthenticateUser {
  constructor(readonly userRepository: UserRepository) {}

  async execute({ email, password }: Input): Promise<Output> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    const tokenPayload = {
      email: user.email,
      role: user.role,
      id: user.userId!,
    };

    const token = await encrypt(tokenPayload);

    return {
      token,
    };
  }
}

type Input = {
  email: string;
  password: string;
};

type Output = {
  token: string;
};
