import UserRepository from "../../../domain/repository/User/UserRepository";

export default class ListUsers {
  constructor(readonly userRepository: UserRepository) {}

  async execute(): Promise<Output[] | undefined> {
    const users = await this.userRepository.listUsers();

    if (users?.length) {
      const usersMap = users.map((user) => ({
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
      }));

      return usersMap;
    }
  }
}

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
