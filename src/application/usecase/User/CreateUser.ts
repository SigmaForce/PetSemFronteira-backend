import UserRepository from "../../../domain/repository/User/UserRepository";
import {
  BadRequestError,
  InternalServerError,
} from "../../../shared/errors/Errors";

export default class CreateUser {
  constructor(readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<Output | undefined> {
    try {
      const hasUser = await this.userRepository.findByEmail(input.email);

      if (hasUser)
        throw new Error("Already have user with this e-mail address");
    } catch (err) {
      throw new BadRequestError({
        cause: err,
        message: "E-mail already exists",
      });
    }
    try {
      const user = {
        nickName: input.nickName,
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        birthDate: new Date(input.birthDate),
        password: input.password,
        phone: input.phone,
        role: input.role,
        status: input.status,
        description: input.description,
        image_url: input.image_url,
        userId: input.userId,
      };
      const userId = await this.userRepository.create(user);
      if (userId) return { userId: userId, message: "User created" };
    } catch (err) {
      throw new InternalServerError({ cause: err });
    }
  }
}

type Input = {
  nickName: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  password: string;
  phone: string;
  role: "ADMIN" | "USER" | "ONG";
  status?: boolean;
  description?: string;
  image_url?: string;
  userId?: string;
};

type Output = {
  userId?: string;
  message: string;
};
