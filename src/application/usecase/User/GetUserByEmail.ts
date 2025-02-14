import UserRepository from "../../../domain/repository/User/UserRepository";

export default class GetUserByEmail {
  constructor(readonly userRepository: UserRepository) {}

  async execute({ email }: Input): Promise<Output | undefined> {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      const output = {
        userId: user.userId!,
        nickName: user.nickName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
        phone: user.phone,
        role: user.role,
        status: user.status,
        description: user.description,
        image_url: user.image_url,
      };

      return output;
    }
  }
}

type Input = {
  email: string;
};

type Output = {
  userId: string;
  nickName: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  phone: string;
  role: "ADMIN" | "USER" | "ONG";
  status?: boolean;
  description?: string;
  image_url?: string;
};
